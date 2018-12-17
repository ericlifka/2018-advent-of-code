(ns advent.2018.11)

(def GRID-CERIAL-NUMBER 5468)

(defn get-hundredths-place [x]
  (if (< x 100) 0
      (Integer/parseInt (str (first (take-last 3 (seq (str x))))))))

(def calc-power-level 
  (memoize
   (fn [x y]
     (let [rack-id (+ x 10)
           power-level (+ (* rack-id y) GRID-CERIAL-NUMBER)
           power-level2 (* power-level rack-id)
           hundreds (get-hundredths-place power-level2)]
       (- hundreds 5)))))

(defn get-grid [x y size]
  (for [_x (range size) _y (range size)]
       [(+ x _x) (+ y _y)]))

(println 
 (last
  (sort-by first
           (for [x (range 1 299) y (range 1 299)]
             [(reduce + (map #(apply calc-power-level %) (get-grid x y 3))) x y])
           ))
 )

(defn find-max [tuples]
  (reduce #(if (> (last %1) (last %2)) %1 %2) tuples))

(defn max-of-size [size]
  (let [max (atom [0 0 0 0])]
    (doall 
     (for [x (range 1 (- 302 size)) 
           y (range 1 (- 302 size))]
       (let [power-level (reduce + (map #(apply calc-power-level %)
                                        (get-grid x y size)))]
         (if (< (last @max) power-level)
           (reset! max [x y size power-level]))
         nil)))
    max))

; (println
;  (last
;   (sort-by first
;            (for [s (range 1 301)
;                  x (range 1 (- 302 s))
;                  y (range 1 (- 302 s))]
;              (do 
;                (if (and (= 1 x) (= 1 y)) (println [x y s]))
;                [(reduce + (map #(apply calc-power-level %) (get-grid x y s))) x y s])))))

(let [maxes (for [s (range 1 20)]
              (time (max-of-size s)))]
     (println (last (sort-by last maxes))))