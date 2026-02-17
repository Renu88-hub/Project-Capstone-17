import React from "react";
import UserList from "./UserList";
import RoleMatrix from "./RoleMatrix";
import PermissionEditor from "./PermissionEditor";
import TreatyConfiguration from "./TreatyConfiguration";
import ThresholdConfig from "./ThresholdConfig";
import AuditLogs from "./AuditLogs";

const AdminRoutes = ({ currentTab }) => {
  switch (currentTab) {
    case "users":
      return <UserList />;
    case "roles":
      return <RoleMatrix />;
    case "permissions":
      return <PermissionEditor />;
    case "treaties":
      return <TreatyConfiguration />;
    case "thresholds":
      return <ThresholdConfig />;
    case "auditLogs":
      return <AuditLogs />;
    default:
      return <UserList />;
  }
};

export default AdminRoutes;
