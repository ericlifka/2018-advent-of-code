(ns advent.2018.14)

(def TARGET (+ 846601 10))

(defn generate-recipes [val1 val2]
  (map #(Integer/parseInt (str %)) (seq (str (+ val1 val2)))))

(defn add-recipes [recipes new-recipes]
  (if (zero? (count new-recipes))
    recipes
    (recur (conj recipes (first new-recipes))
           (rest new-recipes))))

(time
(loop [elf1 0
       elf2 1
       recipes [3 7]]
  (let [elf1-value (nth recipes elf1)
        elf2-value (nth recipes elf2)
        new-recipes (generate-recipes elf1-value elf2-value)
        joined-recipes (add-recipes recipes new-recipes)
        recipe-count (count joined-recipes)]
    (if (<= TARGET recipe-count)
      (println (take-last 10 joined-recipes))
      (recur (mod (+ 1 elf1 elf1-value) recipe-count)
             (mod (+ 1 elf2 elf2-value) recipe-count)
             joined-recipes)))))