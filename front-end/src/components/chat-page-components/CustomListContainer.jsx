import { SearchField } from "../SearchField"
import { Button } from "@material-ui/core"
import { Link } from "react-router-dom"
import "stream-chat-react/dist/css/index.css"

export function CustomListContainer({ children }) {
  return (
    <div className="w-72 flex flex-col gap-4 m-3 h-full relative">
      <SearchField placeholder="Email..." />
      {children}
      <Link to=".." relative="path" className="absolute bottom-2 w-full">
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="w-full mb-4"
        >
          Back
        </Button>
      </Link>
    </div>
  )
}
