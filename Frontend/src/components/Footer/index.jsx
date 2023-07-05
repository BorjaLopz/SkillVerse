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
    }
  );

  return (
    <footer>
      <div className="linkedin">
        <p>
          {" "}
          Hecho con{" "}
          <button
            disabled={isAnimating}
            onClick={() => {
              confettiReward();
            }}
          >
            <span id="rewardId" />
            💜
          </button>{" "}
          para
          <Link
            to="https://www.hackaboss.com/"
            target="_blank"
            style={{ textDecoration: "underline", color: "#8750a5" }}
          >
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
