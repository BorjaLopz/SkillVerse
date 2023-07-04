import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { useReward } from "react-rewards";

const Footer = () => {
  const { reward, isAnimating } = useReward("rewardId", "confetti");

  const config = {
    emoji: ["💖", "💙", "❤"],
    elementCount: 1,
  };

  return (
    <footer>
      <div className="linkedin">
        <p>
          {" "}
          Hecho con{" "}
          <button disabled={isAnimating} onClick={reward} config={config}>
            <span id="rewardId" />
            💜
          </button>{" "}
          para
          <Link className="hab" to="https://www.hackaboss.com/" target="_blank">
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
