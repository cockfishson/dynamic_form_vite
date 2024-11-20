import { useNavigate } from "react-router-dom";

export const useHandleNavigation = () => {
  const navigate = useNavigate();

  const handleNavigation = (link) => {
    navigate(link);
  };

  return handleNavigation;
};
