import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import CancelIcon from "./icons/CancelIcon";

export default function Modal({
  children,
  show = false,
  closeable = true,
  title = "",
  onClose = () => {},
}) {
  const close = () => {
    if (closeable) {
      onClose();
    }
  };

  return (
    <>
      <Dialog
        open={show}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="backdrop-blur-sm fixed bg-black/50 inset-0 z-10 w-screen duration-300 linear overflow-y-auto data-[closed]:opacity-0">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-xl 2xl:max-w-3xl rounded-xl bg-white p-4 2xl:p-6"
            >
              <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-4 2xl:mb-6">
                <DialogTitle as="h3" className="font-20 font-medium text-black">
                  {title}
                </DialogTitle>
                <button
                  onClick={close}
                  className="flex text-gray-400 hover:text-gray-500 items-center justify-center size-6 2xl:size-7 bg-gray-100 hover:bg-gray-200 rounded-full"
                >
                  <CancelIcon />
                </button>
              </div>
              {children}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
