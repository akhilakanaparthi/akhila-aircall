import {
  FiArchive,
  FiPhoneCall,
  FiPhoneIncoming,
  FiPhoneOutgoing,
  FiPhoneMissed,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./ActivityItem.css";
import { useState } from "react";

const ActivityItem = ({ activity, onArchive, isArchiveView }) => {
  const navigate = useNavigate();
  const [isSpinning, setIsSpinning] = useState(false);

  const getCallIcon = (type, direction) => {
    // Check for missed calls first
    if (type && type.toLowerCase() === "missed") {
      return <FiPhoneMissed className="call-type-icon missed" />;
    }

    // Then check direction
    if (direction) {
      if (direction.toLowerCase() === "inbound") {
        return <FiPhoneIncoming className="call-type-icon incoming" />;
      } else if (direction.toLowerCase() === "outbound") {
        return <FiPhoneOutgoing className="call-type-icon outgoing" />;
      }
    }

    // Fallback for answered and default cases
    switch (type.toLowerCase()) {
      case "answered":
        return <FiPhoneCall className="call-type-icon answered" />;
      default:
        return <FiPhoneCall className="call-type-icon" />;
    }
  };

  const handleArchiveClick = (e) => {
    e.stopPropagation();
    setIsSpinning(true);
    const newArchiveState = isArchiveView ? false : true;
    onArchive(activity.id, newArchiveState);
    toast.success(
      newArchiveState
        ? "Call archived successfully"
        : "Call unarchived successfully"
    );
  };

  const handleActivityClick = () => {
    navigate(`/activity/${activity.id}`);
  };

  return (
    <motion.div
      className="activity-item"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
      onClick={handleActivityClick}
      style={{ cursor: "pointer" }}
    >
      <div className="activity-content">
        <div className="call-header">
          {getCallIcon(activity.call_type, activity.direction)}
          <div className="call-participants">
            <span className="from">{activity.from}</span>
            <span className="arrow">→</span>
            <span className="to">{activity.to}</span>
          </div>
        </div>
        <div className="call-details">
          <div className="info-grid">
            <div className="info-item small-text">
              <strong>Duration: </strong>
              <span>{activity.duration ? `${activity.duration}s` : "0s"}</span>
            </div>
            <div className="info-item small-text">
              <strong>Time: </strong>
              <span>
                {activity.created_at
                  ? new Date(activity.created_at).toLocaleString()
                  : "N/A"}
              </span>
            </div>
            <div className="info-item small-text">
              <strong>Status: </strong>
              <span>
                {activity.call_type}
                {activity.direction && ` (${activity.direction})`}
              </span>
            </div>
          </div>
        </div>
      </div>

      <motion.button
        className="archive-button"
        onClick={handleArchiveClick}
        animate={{
          rotate: isSpinning ? 1040 : 0,
        }}
        transition={{ duration: 0.3 }}
        onAnimationComplete={() => setIsSpinning(false)}
        whileHover={{
          scale: 1.1,
          backgroundColor: "#f0f0f0",
        }}
        title={isArchiveView ? "Unarchive" : "Archive"}
      >
        <FiArchive size={20} />
      </motion.button>
    </motion.div>
  );
};

export default ActivityItem;
