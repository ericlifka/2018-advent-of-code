(ns advent.2018.01
  (:require [clojure.string :refer [split-lines]]))

(defn map-2d [lambda grid]
  (map (fn [row]
         (map (fn [elem]
                (lambda elem))
              row))
       grid))

(defn lookup [seq-2d x y]
  (-> seq-2d
      (nth y)
      (nth x)))

(defn print-grid [grid]
  (doall (for [row grid]
           (do
             (doall (for [char row] 
                      (print char)))
             (println)))))

(defn print-tracks [tracks karts]
  (print-grid
   (reduce (fn [updated-tracks kart] 
             (assoc-in updated-tracks [(:y kart) (:x kart)] 
                       (condp = (:direction kart)
                         :north \^
                         :south \v
                         :east \>
                         :west \<)))
           tracks karts)))

(defn find-karts [grid]
  (remove 
   nil? 
   (for [y (range (count grid))
         x (range (count (first grid)))]
     (let [cell (lookup grid x y)]
       (cond
         (= cell \v) {:direction :south :turns 0 :x x :y y}
         (= cell \>) {:direction :east :turns 0 :x x :y y}
         (= cell \<) {:direction :west :turns 0 :x x :y y}
         (= cell \^) {:direction :north :turns 0 :x x :y y}
         :else nil)))))

(defn remove-karts [grid]
  (map-2d #(cond
             (= % \v) \|
             (= % \>) \-
             (= % \<) \-
             (= % \^) \|
             :else %)
          grid))

(defn sort-karts [karts]
  (sort-by #(+ (* 10 (:y %)) (:x %)) karts))

(defn step-kart [kart grid]
  (let [{:keys [x y turns direction]} kart
        track (lookup grid x y)]
    (cond
      (= track \|) (update kart :y (if (= :north direction) dec inc))
      (= track \-) (update kart :x (if (= :east direction) inc dec))
      (= track \/) (cond 
                     (= :north direction) {:direction :east :turns turns :x (inc x) :y y}
                     (= :south direction) {:direction :west :turns turns :x (dec x) :y y}
                     (= :east direction) {:direction :north :turns turns :x x :y (dec y)}
                     (= :west direction) {:direction :south :turns turns :x x :y (inc y)})
      (= track \\) (cond
                     (= :north direction) {:direction :west :turns turns :x (dec x) :y y}
                     (= :south direction) {:direction :east :turns turns :x (inc x) :y y}
                     (= :east direction) {:direction :south :turns turns :x x :y (inc y)}
                     (= :west direction) {:direction :north :turns turns :x x :y (dec y)})
      (= track \+) (cond
                     (= turns 0) (cond  ; turn left
                                   (= :north direction) {:direction :west :turns 1 :x (dec x) :y y}
                                   (= :south direction) {:direction :east :turns 1 :x (inc x) :y y}
                                   (= :east direction) {:direction :north :turns 1 :x x :y (dec y)}
                                   (= :west direction) {:direction :south :turns 1 :x x :y (inc y)})
                     (= turns 1) (cond  ; go straight
                                   (= :north direction) {:direction :north :turns 2 :x x :y (dec y)}
                                   (= :south direction) {:direction :south :turns 2 :x x :y (inc y)}
                                   (= :east direction) {:direction :east :turns 2 :x (inc x) :y y}
                                   (= :west direction) {:direction :west :turns 2 :x (dec x) :y y})
                     (= turns 2) (cond  ; turn right
                                   (= :north direction) {:direction :east :turns 0 :x (inc x) :y y}
                                   (= :south direction) {:direction :west :turns 0 :x (dec x) :y y}
                                   (= :east direction) {:direction :south :turns 0 :x x :y (inc y)}
                                   (= :west direction) {:direction :north :turns 0 :x x :y (dec y)})))))

(defn check-collision [kart other-karts]
  (let [other (first other-karts)
        remaining (rest other-karts)]
    (cond
      (nil? other) nil
      (and (= (:x other) (:x kart))
           (= (:y other) (:y kart))) other
      :else (recur kart remaining))))

(let [input (slurp "input-13.txt")
      grid (vec (map #(vec (seq %)) (split-lines input)))
      all-karts (sort-karts (find-karts grid))
      tracks (remove-karts grid)]
  (loop [processed-karts []
         current-kart (first all-karts)
         remaining-karts (rest all-karts)]
    (let [; move the current kart one step
          updated-kart (step-kart current-kart tracks)
          ; find any kart that the current kart collided with
          collision-kart (check-collision updated-kart (concat processed-karts remaining-karts))
          ; update the lists based on whether there was a collision
          processed-karts (if (nil? collision-kart)
                            (conj processed-karts updated-kart)
                            (remove #(= % collision-kart) processed-karts))
          remaining-karts (if (nil? collision-kart)
                            remaining-karts
                            (remove #(= % collision-kart) remaining-karts))
          ; check if we need to move the processed karts back into the queue to start a new tick
          rollover? (zero? (count remaining-karts))
          new-processed-karts (if rollover? [] processed-karts)
          new-remaining-karts (if rollover? 
                                (sort-karts processed-karts)
                                remaining-karts)
          ; check if we've hit the end of a full tick and we're down to one kart
          end? (and rollover? (= 1 (count new-remaining-karts)))]
      (if end?
        (println (concat new-processed-karts new-remaining-karts)) ; only one kart left, print and end
        (recur new-processed-karts
               (first new-remaining-karts)
               (rest new-remaining-karts))
        ))))
