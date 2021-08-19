import SidebarProp from '../types/SidebarProp';

import SpeedIcon from '@material-ui/icons/Speed';
import PersonIcon from '@material-ui/icons/Person';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import HistoryIcon from '@material-ui/icons/History';
import SettingsIcon from '@material-ui/icons/Settings';

const color = "#FFFFFF";

const Dashboard: SidebarProp = {
    title: "Dashboard",
    path: "/dashboard",
    icon: {
        name: SpeedIcon,
        htmlColor: color,
    }
}

const User: SidebarProp = {
    title: "User",
    path: "/user",
    icon: {
        name: PersonIcon,
        htmlColor: color,
    }
}

const Certificate: SidebarProp = {
    title: "Certificate",
    path: "/certificate",
    icon: {
        name: CardGiftcardIcon,
        htmlColor: color,
    }
}

const Activity: SidebarProp = {
    title: "Activity",
    path: "/activity",
    icon: {
        name: HistoryIcon,
        htmlColor: color,
    }
}

const Settings: SidebarProp = {
    title: "Settings",
    path: "/settings",
    icon: {
        name: SettingsIcon,
        htmlColor: color,
    }
}

const SidebarData: SidebarProp[] = [
    Dashboard, User, Certificate, Activity, Settings
];

export default SidebarData;


