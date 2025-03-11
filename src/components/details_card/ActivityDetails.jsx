import { useParams, useNavigate } from "react-router-dom";
import {
  FiPhoneIncoming,
  FiPhoneOutgoing,
  FiPhoneMissed,
  FiPhoneCall,
  FiArrowLeft,
  FiArchive,
  FiClock,
  FiCalendar,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ActivityDetails = ({ activities, updateItem }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const activity = activities?.find((act) => act.id === id);

  if (!activity) return <p className="error-message">No activity found</p>;

  const getCallIcon = () => {
    switch (activity?.call_type?.toLowerCase()) {
      case "missed":
        return <FiPhoneMissed className="call-type-icon missed" />;
      case "answered":
        return activity.direction === "inbound" ? (
          <FiPhoneIncoming className="call-type-icon incoming" />
        ) : (
          <FiPhoneOutgoing className="call-type-icon outgoing" />
        );
      default:
        return <FiPhoneCall className="call-type-icon" />;
    }
  };

  const handleUpdateCall = () => {
    updateItem(activity.id, {
      is_archived: activity.is_archived ? false : true,
    });
    toast.success(
      `Call has been ${
        activity.is_archived ? "unarchived" : "archived"
      } successfully!`,
      {
        autoClose: 2000,
      }
    );
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      className="activity-details-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <button onClick={() => navigate(-1)} className="back-button">
        <FiArrowLeft /> Back to calls
      </button>

      <div className="activity-details-card">
        <div className="details-header">
          <div className="icon-container">{getCallIcon()}</div>
          <div className="header-text">
            <h2>
              {activity.direction === "inbound"
                ? "Incoming Call"
                : "Outgoing Call"}
            </h2>
            <p className="call-type">
              {activity.call_type.charAt(0).toUpperCase() +
                activity.call_type.slice(1)}
            </p>
          </div>
        </div>

        <div className="details-content">
          <div className="contact-grid">
            <div className="contact-item">
              <p className="label">From</p>
              <p className="value">{activity.from || "Unknown"}</p>
            </div>
            <div className="contact-item">
              <p className="label">To</p>
              <p className="value">{activity.to || "Unknown"}</p>
            </div>
          </div>

          <div className="time-details">
            <div className="detail-row">
              <FiCalendar />
              <span>{formatDateTime(activity.created_at)}</span>
            </div>

            {activity.duration > 0 && (
              <div className="detail-row">
                <FiClock />
                <span>Duration: {formatDuration(activity.duration)}</span>
              </div>
            )}
          </div>

          <button className="archive-action-button" onClick={handleUpdateCall}>
            <FiArchive />
            {activity.is_archived ? "Unarchive Call" : "Archive Call"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityDetails;
