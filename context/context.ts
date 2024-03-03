import { CurrentVideoContext } from "@/types/globalTypes";
import { createContext } from "react";

export const CurrentVideo = createContext<CurrentVideoContext>({} as any);
