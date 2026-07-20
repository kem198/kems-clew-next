type Live2DWidgetProps = {
  className?: string;
};

const LIVE2D_WIDGET_URL =
  "https://kem198.github.io/modane-live2d-widget/CubismSdkForWeb-4-r.7/Samples/TypeScript/Demo/index.html";

/**
/* 単に iframe 要素のみを表示すると、スマートフォンなどデバイスピクセル比が 2 の端末でぼけて表示されてしまう。
 * このため下記の順で処理して対策している。
 *
 * 1. 子要素 iframe を 2 倍のサイズで書き出した後に 1/2 サイズへ縮小して表示する。
 * 2. このままだと領域が 2 倍のままなので親要素 wrapper の overflow: hidden でクリッピングする。
 */
export function Live2DWidget({ className }: Live2DWidgetProps) {
  return (
    <div className={`h-150 w-150 overflow-hidden ${className ?? ""} `}>
      <div className="h-150 w-150">
        <iframe
          src={LIVE2D_WIDGET_URL}
          title="Live2D Widget"
          className="block h-300 w-300 origin-top-left scale-50 border-0"
          allow="autoplay"
        />
      </div>
    </div>
  );
}
