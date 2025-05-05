import { useEffect } from "react";
import Swal from "sweetalert2";

const FunFactPopup = () => {
  useEffect(() => {
    const fetchFunFact = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/funfact");
        const data = await res.json();

        Swal.fire({
          title: "Did You Know?",
          text: data.fact,
          icon: "info",
          confirmButtonText: "Cool!",
          background: "#f0f8ff",
          color: "#333",
          confirmButtonColor: "#3085d6",
          customClass: {
            popup: "rounded-xl shadow-lg",
          },
        });
      } catch (err) {
        console.error("Error fetching fun fact", err);
      }
    };

    fetchFunFact();
  }, []);

  return null;
};

export default FunFactPopup;
