;; (with-open-file (input (open "./input-01.txt"))
;;     (format t "~a~%" (read-line input)))

(defun get-file (filename)
    (with-open-file (stream filename)
        (loop for line = (read-line stream nil)
            while line
            collect line)))

;; (format t "~a~%"
;;     (loop for x in (get-file "./input-01.txt") sum (parse-integer x)))

(let ((file-data (get-file "./input-01.txt"))
      (frequencies (mapcar 'parse-integer file-data))
      (part-1-sum (reduce #'+ frequencies)))
    (format t "~a~%" part-1-sum))