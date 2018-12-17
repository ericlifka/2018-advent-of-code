(ns advent.2018.11)

(def GRID-CERIAL-NUMBER 5468)

(defn get-hundredths-place [x]
  (if (< x 100) 0
      (->> x 
           (str)
           (seq)
           (take-last 3)
           (first)
           (str)
           (Integer/parseInt))))

(def calc-power-level
  (memoize
   (fn [x y]
     (let [rack-id (+ x 10)]
       (->> rack-id
            (* y)
            (+ GRID-CERIAL-NUMBER)
            (* rack-id)
            (get-hundredths-place)
            (+ -5))))))

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
       (->> (outer-square-coords x y s)
            (map #(calc-power-level (first %) (last %)))
            (reduce +)
            (+ (calc-square x y (dec s))))))))

(defn max-grid-reducer [left right]
  (if (> (first left) (first right)) 
    left 
    right))

(defn max-of-size [s]
  (reduce max-grid-reducer
          (for [x (range 1 (- 302 s))
                y (range 1 (- 302 s))]
            [(calc-square x y s) x y s])))

(defn max-of-all-sizes []
  (reduce max-grid-reducer
          (for [s (range 1 16)] 
            (max-of-size s))))

(println "part 1" (time (max-of-size 3)))
(println "part 2" (time (max-of-all-sizes)))
