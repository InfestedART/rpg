import { useCharacterStore } from "@/store/characterStore"
import { Navigate, Outlet } from "react-router-dom"

const StoreRequired = () => {
  const { selectedCharacterId } = useCharacterStore();

  if (!selectedCharacterId) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />
}

export default StoreRequired