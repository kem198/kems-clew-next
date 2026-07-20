import { cn } from "@/lib/utils";

type ModaneLive2DWidgetProps = {
  className?: string;
};

const LIVE2D_WIDGET_URL =
  "https://kem198.github.io/modane-live2d-widget/CubismSdkForWeb-4-r.7/Samples/TypeScript/Demo/index.html";

/**
 * 単に iframe 要素のみを表示すると、スマートフォンなど
 * devicePixelRatio が高い端末でぼけて表示される。
 *
 * 対策:
 *
 * 1. iframe を 2 倍サイズで描画する。
 * 2. scale-50 で表示サイズを半分に戻す。
 * 3. wrapper の overflow-hidden で余分な描画領域を切り取る。
 */
export function ModaneLive2DWidget({ className }: ModaneLive2DWidgetProps) {
  return (
    <div
      className={cn(
        "pointer-events-none h-150 w-125 overflow-hidden max-md:w-75",
        className,
      )}
    >
      <iframe
        src={LIVE2D_WIDGET_URL}
        title="Live2D Widget"
        referrerPolicy="no-referrer"
        loading="lazy"
        className="pointer-events-auto block h-300 w-250 origin-top-left scale-50 border-0 max-md:w-150"
      />
    </div>
  );
}
