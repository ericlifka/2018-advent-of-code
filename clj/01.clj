(ns advent.2018.01
    (:require [clojure.string :refer [split-lines]]))
  
(defn part1 [frequencies]
  (reduce + frequencies))

(defn part2 [seen sum frequencies all]
  (let [new-sum (+ sum (first frequencies))
        remaining (if (= 1 (count frequencies))
                    all 
                    (rest frequencies))]
    (if (seen new-sum) 
      new-sum
      (recur (conj seen new-sum) new-sum remaining all))))

(let [input (slurp "input-01.txt")
      lines (split-lines input)
      numbers (map #(Integer/parseInt %) lines)]
  
  (println "part1" (part1 numbers))
  (println "part2" (part2 #{} 0 numbers numbers)))
