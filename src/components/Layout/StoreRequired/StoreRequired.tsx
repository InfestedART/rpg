import { useCharacterStore } from "@/store/characterStore"
import { Navigate, Outlet } from "react-router-dom"

const StoreRequired = () => {
  const { selectedCharacter } = useCharacterStore();

  if (!selectedCharacter) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />
}

export default StoreRequired