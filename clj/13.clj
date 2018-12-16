(ns advent.2018.01
  (:require [clojure.string :refer [split-lines 
                                    join]]))

(defn print-grid [grid]
  (doall (for [row grid]
           (do
             (doall  (for [char row] 
                       (print char)))
             (println)))))

(defn lookup [seq-2d x y]
  (nth (nth seq-2d y) x))

(defn find-karts [grid]
  (remove 
   nil? 
   (for [y (range (count grid))
         x (range (count (first grid)))]
     (let [cell (lookup grid x y)]
       (cond
         (= cell \v) {:direction :south :x x :y y}
         (= cell \>) {:direction :east :x x :y y}
         (= cell \<) {:direction :west :x x :y y}
         (= cell \^) {:direction :north :x x :y y}
         :else nil)))))

(let [input (slurp "input-13.txt")
      grid (map #(seq %) (split-lines input))
      karts (find-karts grid)
    ;   tracks (remove-karts grid)
      ]

;   (println (range (count grid)))
;   (println (range (count (first grid))))
;   (print-grid grid)
  (println karts)
  )

;   (doall (for [row grid]
;            (do
;              (doall (for [char row]
;                       (print char)))
;              (println)))))
