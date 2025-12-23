import {
  HomeOutlined,
  PeopleOutlineOutlined,
  ContactsOutlined,
  ReceiptOutlined,
  AddchartOutlined,
  DnsOutlined,
  CloudSyncOutlined,
  SettingsOutlined,
  AccountCircleOutlined,
  LogoutOutlined,
  ChatOutlined,
  BarChartOutlined,
  TaskAltOutlined,
  HistoryOutlined ,
  NotificationsOutlined,
   SubtitlesOutlined ,
   MoveDownOutlined,
   SaveAltOutlined,
   RocketLaunchOutlined,
   GroupAddOutlined
} from "@mui/icons-material";

export const sidebarAdmin  = [
  {
    id: "main",
    items: [
      { text: "Dashboard", icon: HomeOutlined, path: "/" },
      { text: "Manage Employees", icon: PeopleOutlineOutlined, path: "/employees/create" },
      ],
  },
  {
    id: "system",
    items: [
      
      { text: "Statistics & Reports", icon: AddchartOutlined, path: "/form" },
      { text: "Sys Logs / Tracing", icon: DnsOutlined, path: "/calender" },
      { text: "Backup & Restore", icon: CloudSyncOutlined, path: "/faq" },
    ],
  },
  {
    id: "profile",
    items: [
      { text: "Settings", icon: SettingsOutlined, path: "/settings" },
      { text: "Profile", icon: AccountCircleOutlined, path: "/profile" },
        { text: "Logout", icon: LogoutOutlined, path: "/profile" },
    ],
  },
];
export const sidebarManager = [
  {
    id: "main",
    items: [
     
      { text: "Dashboard", icon: HomeOutlined, path: "/" },
       { text: "Add AccountsTypes", icon: ContactsOutlined, path: "/accountType" },
       { text: "All AccountsTypes", icon: ReceiptOutlined, path: "/account-types" },
      { text: "Add Clients", icon: GroupAddOutlined, path: "/addClient" },
      { text: "All Accounts", icon: TaskAltOutlined, path: "/getAllAccount" },
     { text: "Add SubAccounts", icon: SubtitlesOutlined, path: "/sub-accounts/add" },
      { text: "SubAccountsList", icon: DnsOutlined, path: "/sub-accounts" },
       { text: "SubAccounts Hierarchy", icon: DnsOutlined, path: "/accounts/hierarchy" },
      
      { text: "Add Features", icon: ReceiptOutlined, path: "/features/add" },
      { text: "All Features", icon: TaskAltOutlined, path: "/features" },
    
      { text: "Approvals Pending", icon: HistoryOutlined, path: "/approvals/pending" },
      { text: "Reports", icon: BarChartOutlined, path: "/getReport" },

    ],
  },
  {
    id: "tools",
    items: [
       { text: "State of Account", icon: ReceiptOutlined, path: "/stateOfAccounts" },
     
      { text: "Complaint History", icon: HistoryOutlined, path: "/history" },
      { text: "Notifications", icon: NotificationsOutlined, path: "/notifications" },
      { text: "Messages", icon: ChatOutlined, path: "/messages" },
      { text: "Reports", icon: BarChartOutlined, path: "/reports" },
    ],
  },
  {
    id: "profile",
    items: [
      { text: "Profile", icon: AccountCircleOutlined, path: "/profile" },
      { text: "Logout", icon: LogoutOutlined, path: "/logout" },
    ],
  },
];

export const sidebarTeller = [
  {
    id: "main",
    items: [
      { text: "Dashboard", icon: HomeOutlined, path: "/" },
      { text: "Add Clients", icon: GroupAddOutlined, path: "/addClient" },
      { text: "All Accounts", icon: TaskAltOutlined, path: "/getAllAccount" },
      { text: "deposite ", icon: SaveAltOutlined, path: "/transactions/deposit" },
       { text: "Withdrawal ", icon: RocketLaunchOutlined, path: "/transactions/Withdrawal" },
       { text: "transfer ", icon: MoveDownOutlined, path: "/transactions/transfer" },
      
      { text: "Complaint History", icon: HistoryOutlined, path: "/history" },
    ],
  },
  {
    id: "tools",
    items: [
       { text: "State of Account", icon: ReceiptOutlined, path: "/stateOfAccounts" },
     
      { text: "Notifications", icon: NotificationsOutlined, path: "/notifications" },
      { text: "Messages", icon: ChatOutlined, path: "/messages" },
      { text: "Reports", icon: BarChartOutlined, path: "/getReport" },
    ],
  },
  {
    id: "profile",
    items: [
      { text: "Profile", icon: AccountCircleOutlined, path: "/profile" },
      { text: "Logout", icon: LogoutOutlined, path: "/logout" },
    ],
  },
];
