import { create } from "zustand";

type EarningsState = {
	totalEarnings: number;
	addEarnings: (amount: number) => void;
};

export const useEarningsStore = create<EarningsState>((set) => ({
	totalEarnings: 28500,
	addEarnings: (amount) =>
		set((state) => ({ totalEarnings: state.totalEarnings + amount })),
}));

export const useEarnings = () =>
	useEarningsStore((select) => select.totalEarnings);
export const addEarnings = () =>
	useEarningsStore((select) => select.addEarnings);
