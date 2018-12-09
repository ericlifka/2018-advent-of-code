(ns advent.2018.01
  (:require [clojure.string :refer [split-lines]]))

(defn bucket-str 
  ([str] (bucket-str str {}))
  ([str bucket] 
   (let [letter (first str)
         str (rest str)
         bucket (update bucket letter #(if % (inc %) 1))]
     (if (= 0 (count str)) bucket
       (recur str bucket)))))

(defn has-n [n]
  (fn [bucket]
    (< 0 (count (filter #(= n (second %)) (seq bucket))))))

(defn part1 [lines]
  (let [buckets (map bucket-str lines)
        two-count (count (filter (has-n 2) buckets))
        three-count (count (filter (has-n 3) buckets))]
    (* two-count three-count)))

(let [input (slurp "input-02.txt")
     lines (seq (split-lines input))]
  
  (println "part1" (part1 lines)))
