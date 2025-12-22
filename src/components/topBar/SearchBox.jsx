import { Search, SearchIconWrapper, StyledInputBase } from "./TopBar.styles";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBox() {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
    </Search>
  );
}
