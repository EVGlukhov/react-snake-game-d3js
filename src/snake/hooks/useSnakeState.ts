import { useContext } from "react";
import { SnakeContext } from "../state";

export const useSnakeState = () => useContext(SnakeContext)