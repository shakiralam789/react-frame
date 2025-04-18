import cn from "@/utilities/cn";

export default function Radio({ className = "", label, ...props }) {
    return (
        <div
            {...props}
            className={cn(
                `group cursor-pointer flex items-center gap-2`,
                className
            )}
        >
            <div className="rounded-full size-5 2xl:size-6 border-2 duration-300 group-hover:border-primary-purple group-[.active]:border-primary-purple p-1 2xl:p-1.5">
                <div
                    className={`group-[.active]:bg-primary-purple duration-300 rounded-full w-full h-full`}
                ></div>
            </div>
            {label && <span className="capitalize font-16 text-slate-600">{label}</span>}
        </div>
    );
}
