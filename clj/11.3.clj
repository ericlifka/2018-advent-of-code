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

; (defn calc-power-level [x y] 1) ; for testing
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

(def summed-square-value
  (memoize
   (fn [x y]
     (let [coord-power-level (calc-power-level x y)]
       (cond
         (or (<= x 0) (<= y 0)) 0
         (and (= 1 x) (= 1 y)) coord-power-level
         (= 1 x) (+ coord-power-level 
                    (summed-square-value 1 (dec y)))
         (= 1 y) (+ coord-power-level
                    (summed-square-value (dec x) 1))
         :else (- (+ coord-power-level
                     (summed-square-value x (dec y))
                     (summed-square-value (dec x) y))
                  (summed-square-value (dec x) (dec y))))))))

(defn calc-square-value [x y s]
  (let [s-1 (dec s)
        x-1 (dec x)
        y-1 (dec y)]
    (+ (summed-square-value (+ x s-1) (+ y s-1))  ; total square
       (- (summed-square-value (+ x s-1) y-1))    ; top rectangle
       (- (summed-square-value x-1 (+ y s-1)))    ; left rectangle
       (summed-square-value x-1 y-1))))           ; repeated inner square

(defn max-grid-reducer [left right]
  (if (> (first left) (first right))
    left
    right))

(defn max-of-size [s]
  (reduce max-grid-reducer
          (for [x (range 1 (- 302 s))
                y (range 1 (- 302 s))]
            [(calc-square-value x y s) x y s])))

(defn max-of-all-sizes []
  (reduce max-grid-reducer
          (for [s (range 1 16)]
            (max-of-size s))))

(println "part 1" (time (max-of-size 3)))
(println "part 2" (time (max-of-all-sizes)))
