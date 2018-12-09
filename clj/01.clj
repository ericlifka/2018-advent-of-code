(ns advent.2018.01
    (:require [clojure.string :refer [split-lines]]))
  
(defn part1 [frequencies]
  (reduce + frequencies))

(defn run-sequence [seen sum frequencies]
  (let [new-sum (+ sum (first frequencies))
        remaining (rest frequencies)]
    (cond
      (seen new-sum) [seen new-sum]
      (<= (count remaining) 0) [seen new-sum]
      :else (run-sequence (conj seen new-sum) new-sum remaining))))

(defn part2 [seen sum frequencies]
  (let [[seen sum] (run-sequence seen sum frequencies)]
    (if (seen sum)
      sum
      (part2 seen sum frequencies))))

(let [input (slurp "input-01.txt")
      lines (split-lines input)
      numbers (map #(Integer/parseInt %) lines)]
  
  (println "part1" (part1 numbers))
  (println "part2" (part2 #{} 0 numbers)))