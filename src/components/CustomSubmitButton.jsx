import { useEffect, useRef } from "react";

export default function CustomSubmitButton({ children }) {
  const buttonRef = useRef(null);

  const animateButton = (e) => {
    e.preventDefault();
    // Reset animation
    buttonRef.current.classList.remove("animate");

    // Add the animation class
    buttonRef.current.classList.add("animate");

    // Remove the animation class after the animation is done
    setTimeout(() => {
      buttonRef.current.classList.remove("animate");
    }, 700);
  };

  useEffect(() => {
    const button = buttonRef.current;
    button.addEventListener("click", animateButton);

    // Cleanup the event listener on component unmount
    return () => {
      button.removeEventListener("click", animateButton);
    };
  }, []);

  return (
    <div ref={buttonRef} className="bubbly-button">
      {children}
    </div>
  );
}
