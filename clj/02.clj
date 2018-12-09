(ns advent.2018.01
  (:require [clojure.string :refer [split-lines join]]))

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

(defn compare-ids [a b mismatch?]
  (let [first-a (first a)
        first-b (first b)
        different? (not= first-a first-b)]
    (cond 
      (and mismatch? different?) false
      (= 0 (count (rest a))) true
      :else (recur (rest a) (rest b) (or different? mismatch?)))))

(defn permutations [items]
  (for [x items y items] (vector x y)))

(defn remove-difference [a b]
  (if (= 0 (count a)) '()
      (let [first-a (first a)]
        (if (= first-a (first b)) 
          (conj (remove-difference (rest a) (rest b)) first-a)
          (remove-difference (rest a) (rest b))))))

(defn part2 [ids]
  (loop [pairs (permutations ids)]
    (let [[a b] (first pairs)]
      (if (and (not= a b) (compare-ids (seq a) (seq b) false))
        (join (remove-difference (seq a) (seq b)))
        (recur (rest pairs))))))

(let [input (slurp "input-02.txt")
      lines (seq (split-lines input))]
  
  (println "part1" (part1 lines))
  (println (part2 lines)))
