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

(defn outer-square-coords [x y s]
  (concat
   (for [_y (range s)]
     [(+ x (dec s)) (+ y _y)])
   (for [_x (range (dec s))]
     [(+ x _x) (+ y (dec s))])))

(def calc-square
  (memoize
   (fn [x y s]
     (if (= s 1)
       (calc-power-level x y)
       (let [s-1 (calc-square x y (- s 1))
             coords (outer-square-coords x y s)]
        ;  (println x y s coords)
         (+ s-1
            (reduce + 
                    (map #(calc-power-level (first %) (last %)) 
                         coords))))))))

(defn max-of-size [s]
  (reduce 
   #(if (> (first %1) (first %2)) %1 %2)
   (for [x (range 1 (- 302 s))
         y (range 1 (- 302 s))]
     [(calc-square x y s)
      x y s])))

(defn max-of-all-sizes []
  (reduce 
   #(if (> (first %1) (first %2)) %1 %2)
   (for [s (range 1 16)] 
     (do (println s) (max-of-size s)))))

(println "part 1" (time (max-of-size 3)))
(println "part 2" (time (max-of-all-sizes)))
