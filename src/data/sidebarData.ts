import SpeedIcon from '@material-ui/icons/Speed';
import PersonIcon from '@material-ui/icons/Person';
import SidebarProp from '../types/SidebarProp';

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

const SidebarData: SidebarProp[] = [
    Dashboard, User
];

export default SidebarData;


