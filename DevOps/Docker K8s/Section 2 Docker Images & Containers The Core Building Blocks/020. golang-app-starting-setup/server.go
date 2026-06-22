package main

import (
	"fmt"
	"log"
	"net/http"
)

var userGoal = "Learn Docker!"

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/html")
		fmt.Fprintf(w, `
			<html>
				<head>
					<link rel="stylesheet" href="styles.css">
				</head>
				<body>
					<section>
						<h2>My Course Goal</h2>
						<h3>%s</h3>
					</section>
					<form action="/store-goal" method="POST">
						<div class="form-control">
							<label>Course Goal</label>
							<input type="text" name="goal">
						</div>
						<button>Set Course Goal</button>
					</form>
				</body>
			</html>
		`, userGoal)
	})

	http.HandleFunc("/store-goal", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodPost {
			enteredGoal := r.FormValue("goal")
			log.Println(enteredGoal)
			userGoal = enteredGoal
		}
		http.Redirect(w, r, "/", http.StatusSeeOther)
	})

	http.Handle("/styles.css", http.StripPrefix("/", http.FileServer(http.Dir("public"))))

	log.Println("Server starting on port 80...")
	log.Fatal(http.ListenAndServe(":80", nil))
}