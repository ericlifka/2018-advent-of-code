(def GRID-CERIAL-NUMBER 5468)

(defn get-hundredths-place [x]
  (if (< x 100) 0
      (Integer/parseInt (str (first (take-last 3 (seq (str x))))))))

(def calc-power-level 
  (memoize  
   (fn [coord]
     (let [x (first coord)
           y (last coord)
           rack-id (+ x 10)
           power-level (+ (* rack-id y) GRID-CERIAL-NUMBER)
           power-level2 (* power-level rack-id)
           hundreds (get-hundredths-place power-level2)]
       (- hundreds 5)))))

(defn get-grid [x y]
  (for [_x (range 3) _y (range 3)]
       [(+ x _x) (+ y _y)]))

(println 
 (last
  (sort-by first
           (for [x (range 1 299) y (range 1 299)]
             [(reduce + (map calc-power-level (get-grid x y))) x y])
           ))
 )