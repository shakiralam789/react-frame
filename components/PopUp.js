import { Dialog, DialogPanel } from "@headlessui/react";
import CancelIcon from "./icons/CancelIcon";
import Button from "./form/Button";
import useApi from "@/hook/useApi";

export default function PopUp({
  show = false,
  closeable = true,
  onClose = () => {},
  info,
}) {
  const { request, processing } = useApi();

  const { method, route, title, slug } = info;

  const close = () => {
    if (closeable) {
      onClose();
    }
  };

  async function popupAction() {
    close();
    request(method, route);
  }

  return (
    <>
      <Dialog
        open={show}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="backdrop-blur-sm fixed bg-black/50 inset-0 z-10 w-screen duration-300 linear overflow-y-auto data-[closed]:opacity-0">
          <div className="flex min-h-full items-center justify-center">
            <DialogPanel
              transition
              className="w-full max-w-sm 2xl:max-w-md rounded-xl bg-white overflow-hidden"
            >
              <div className="p-4 2xl:p-6 text-center bg-gray-200 font-20 font-semibold text-gray-text">
                Are you sure ?
              </div>
              <div className="p-8 2xl:p-10">
                <p className="font-16 font-semibold text-center text-gray-500 mb-4">
                  {title ? title : "Are you sure?"}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Button variant="danger" onClick={close}>
                    Cancel
                  </Button>
                  <Button disabled={processing} onClick={popupAction}>
                    {processing ? "processing..." : "Confirm"}
                  </Button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
