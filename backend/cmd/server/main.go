package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main()  {
  r := chi.NewRouter();
	r.Use(middleware.Logger);
	r.Use(middleware.Recoverer);

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
    w.Write([]byte("Hello, World!"))
  })

	r.Post("/sign-up", func(w http.ResponseWriter, r *http.Request) {
		var data map[string]interface{}
		if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
			http.Error(w, "Invalid JSON", http.StatusBadRequest)
			return
		}

		// Print the data to the console
		log.Printf("Received data: %+v\n", data)

		// Send a simple response back
		w.WriteHeader(http.StatusOK)
		fmt.Fprintln(w, "Data received and logged.")
	})

	http.ListenAndServe(":3000",r);
}
