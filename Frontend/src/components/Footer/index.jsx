import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { useReward } from "react-rewards";

const Footer = () => {
  const { reward: confettiReward, isAnimating } = useReward(
    "rewardId",
    "emoji",
    {
      emoji: ["⚡️", "✨", "💜", "🚀"],
      elementSize: 20,
      elementCount: 40,
      decay: 0.95,
      spread: 50,
      zIndex: 999,
      position: "fixed",
    }
  );

  return (
    <footer>
      <div>
        <p>
          Hecho con{" "}
          <button
            disabled={isAnimating}
            onClick={() => {
              confettiReward();
            }}
          >
            <span id="rewardId" className="rewardId" />
            💜
          </button>{" "}
          para
          <Link to="https://www.hackaboss.com/" target="_blank" className="hab">
            {" "}
            HACK A BOSS
          </Link>{" "}
          en 2023
        </p>
      </div>
    </footer>
  );
};

export default Footer;
