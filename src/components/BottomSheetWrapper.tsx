import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { forwardRef, useCallback } from "react";

type TBottomSheetWrapper = {
  children: React.ReactNode;
  snapPoints?: string[];
};

const BottomSheetWrapper = forwardRef<BottomSheetModal, TBottomSheetWrapper>(
  ({ children, snapPoints }, ref) => {
    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} opacity={0.7} />
      ),
      []
    );
    return (
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={ref}
          index={1}
          snapPoints={snapPoints || ["30%", "40%"]}
          enablePanDownToClose
          enableDynamicSizing={false}
          backdropComponent={renderBackdrop}
          keyboardBehavior="fillParent"
        >
          {children}
        </BottomSheetModal>
      </BottomSheetModalProvider>
    );
  }
);
BottomSheetWrapper.displayName = "BottomSheetWrapper";

export default BottomSheetWrapper;
