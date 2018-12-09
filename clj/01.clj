(ns advent.2018.01
    (:require [clojure.string :refer [split-lines]]))

(let [input (slurp "input-01.txt")
      lines (split-lines input)
      numbers (map #(Integer/parseInt %) lines)]
  
  (defn part1 []
    (reduce + numbers))

  (defn run-sequence [seen sum frequencies]
    (let [new-sum (+ sum (first frequencies))
          remaining (rest frequencies)]
         (if (seen new-sum)
           [seen new-sum]
           (if (> (count remaining) 0)
             (run-sequence (conj seen new-sum) new-sum remaining)
             [seen new-sum]))))
  
  (defn part2 [seen sum frequencies]
    (let [[seen sum] (run-sequence seen sum frequencies)]
         (if (seen sum)
           sum
           (part2 seen sum frequencies))))
  
  (println (part1))
  (println (part2 #{} 0 numbers)))