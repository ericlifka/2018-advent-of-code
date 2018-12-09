(ns advent.2018.01
    (:require [clojure.string :refer [split-lines]]))

(defn part1 []
  (let [input (slurp "input-01.txt")
        lines (split-lines input)
        numbers (map #(Integer/parseInt %) lines)]
    (reduce + numbers)))

(println (part1))