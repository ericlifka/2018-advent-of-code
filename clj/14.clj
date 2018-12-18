(ns advent.2018.14)

(defn generate-recipes [val1 val2]
  (map #(Integer/parseInt (str %)) (seq (str (+ val1 val2)))))

(defn add-recipes [recipes new-recipes]
  (if (zero? (count new-recipes))
    recipes
    (recur (conj recipes (first new-recipes))
           (rest new-recipes))))

(time
 (let [TARGET (+ 846601 10)]
   (loop [elf1 0
          elf2 1
          recipes [3 7]]
     (let [elf1-value (nth recipes elf1)
           elf2-value (nth recipes elf2)
           new-recipes (generate-recipes elf1-value elf2-value)
           joined-recipes (add-recipes recipes new-recipes)
           recipe-count (count joined-recipes)]
       (if (zero? (mod recipe-count 10000)) (println recipe-count))
       (if (<= TARGET recipe-count)
         (println (take-last 10 joined-recipes))
         (recur (mod (+ 1 elf1 elf1-value) recipe-count)
                (mod (+ 1 elf2 elf2-value) recipe-count)
                joined-recipes))))))

(time
 (let [;TARGET [5 1 5 8 9]
       TARGET [8 4 6 6 0 1]
       TARGET_SIZE (count TARGET)]
   (loop [elf1 0
          elf2 1
          recipes [3 7]]
     (let [elf1-value (nth recipes elf1)
           elf2-value (nth recipes elf2)
           new-recipes (generate-recipes elf1-value elf2-value)
           joined-recipes (add-recipes recipes new-recipes)
           recipe-count (count joined-recipes)
           slice1 (vec (take-last TARGET_SIZE joined-recipes))
           slice2 (vec (butlast (take-last (inc TARGET_SIZE) joined-recipes)))]
       (if (zero? (mod recipe-count 10000)) (println recipe-count))
       (cond
         (= TARGET slice1) (println (- recipe-count TARGET_SIZE))
         (= TARGET slice2) (println (- recipe-count TARGET_SIZE 1))
         :else (recur (mod (+ 1 elf1 elf1-value) recipe-count)
                      (mod (+ 1 elf2 elf2-value) recipe-count)
                      joined-recipes))))))