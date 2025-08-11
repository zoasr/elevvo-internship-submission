import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center justify-between rounded-md border font-bold px-2 py-0.5 text-xs w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
	{
		variants: {
			variant: {
				default:
					"bg-transparent text-primary border-primary [a&]:hover:bg-primary/90 focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40 dark:bg-primary/60",
				secondary:
					"bg-transparent text-secondary border-secondary [a&]:hover:bg-secondary/90 focus-visible:ring-secondary/20 dark:focus-visible:ring-secondary/40 dark:bg-secondary/60",
				destructive:
					"bg-transparent text-destructive border-destructive [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
				outline:
					"bg-transparent text-foreground border-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground focus-visible:ring-accent/20 dark:focus-visible:ring-accent/40 dark:bg-accent/60 ",
				success:
					"bg-transparent text-success border-success [a&]:hover:bg-success/90 focus-visible:ring-success/20 dark:focus-visible:ring-success/40 dark:bg-success/60",
				warning:
					"bg-transparent text-warning border-warning [a&]:hover:bg-warning/90 focus-visible:ring-warning/20 dark:focus-visible:ring-warning/40 dark:bg-warning/60",
				info: "bg-transparent text-info border-info [a&]:hover:bg-info/90 focus-visible:ring-info/20 dark:focus-visible:ring-info/40 dark:bg-info/60",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

export type BadgeVariants = VariantProps<typeof badgeVariants>["variant"];

function Badge({
	className,
	variant,
	asChild = false,
	...props
}: React.ComponentProps<"span"> &
	VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : "span";

	return (
		<Comp
			data-slot="badge"
			className={cn(badgeVariants({ variant }), className)}
			{...props}
		/>
	);
}

export { Badge, badgeVariants };
