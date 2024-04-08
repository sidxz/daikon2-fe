import { FaExclamationTriangle } from "react-icons/fa";
import {
  FcAlarmClock,
  FcDisapprove,
  FcHighPriority,
  FcOk,
  FcWorkflow,
} from "react-icons/fc";

export const statusOptions = [
  { name: "Ready for HA", value: "ReadyForHA", icon: <FcAlarmClock /> },
  { name: "Active", value: "Active", icon: <FcWorkflow /> },
  {
    name: "Incorrect m/z",
    value: "IncorrectMz",
    icon: <FaExclamationTriangle />,
  },
  {
    name: "Known Liability",
    value: "KnownLiability",
    icon: <FcHighPriority />,
  },
  {
    name: "Complete - Failed",
    value: "CompleteFailed",
    icon: <FcDisapprove />,
  },
  { name: "Complete - Success", value: "CompleteSuccess", icon: <FcOk /> },
];
