/**
 * Created by HuDianxing on 2017/09/27.
 */
/**
 * 标签打印机类，对OCX插件对象的封装
 */
function LPAPI() {
    this.init();
}

    /**
     * 在Html加载完毕之后需要调用该函数，通过ocx组件来初始化LPAPI实例。
     * @param printer html文件中的ocx组件实例。
     */
    LPAPI.prototype.init = function () {
        if (this.dtPrinter == undefined || this.dtPrinter == null)
            this.dtPrinter = document.getElementById("dtPrinter");
        if (this.dtPrinter)
            return;

        // 添加ocx标签
        try {
            var div = document.createElement("div");
            div.style.display = "none";
            div.innerHTML = '<object id="dtPrinter" classid="clsid:9D846E42-C3EF-4A5D-9805-A269CE7AA470"></object>';
            if (document.body)
                document.body.appendChild(div);
            else
                document.appendChild(div);

            this.dtPrinter = document.getElementById("dtPrinter");
        } catch (e) {}
    };

    /**
     * 获取打印动作的顺时针旋转角度
     * @returns {number}
     *      0：  顺时针旋转0度；
     *      1： 顺时针旋转90度；
     *      2：顺时针旋转180度；
     *      3：顺时针旋转270度；
     */
    LPAPI.prototype.getItemOrientation = function () {
        return this.dtPrinter.ItemOrientation;
    };

    /**
     * 设置后续打印动作的顺时针旋转角度
     * @param nNewValue
     *      0：  顺时针旋转0度；
     *      90： 顺时针旋转90度；
     *      180：顺时针旋转180度；
     *      270：顺时针旋转270度；
     */
    LPAPI.prototype.setItemOrientation = function (nNewValue) {
        this.dtPrinter.ItemOrientation = nNewValue;
    };

    /**
     * 获取打印动作的水平对齐方式
     * @returns {number}
     *      0：水平居左；
     *      1：水平居中；
     *      2：水平居右。
     */
    LPAPI.prototype.getItemHorizontalAlignment = function () {
        return this.dtPrinter.ItemHorizontalAlignment;
    };

    /**
     * 设置后续打印动作的水平对齐方式
     * @param nNewValue
     *      0：水平居左；
     *      1：水平居中；
     *      2：水平居右。
     */
    LPAPI.prototype.setItemHorizontalAlignment = function (nNewValue) {
        this.dtPrinter.ItemHorizontalAlignment = nNewValue;
    };

    /**
     * 获取当前打印动作的垂直对齐方式
     * @returns {number}
     *      0：垂直居上；
     *      1：垂直居中；
     *      2：垂直居下。
     */
    LPAPI.prototype.getItemVerticalAlignment = function () {
        return this.dtPrinter.ItemVerticalAlignment;
    };

    /**
     * 设置后续打印动作的垂直对齐方式
     * @param nNewValue
     *      0：垂直居上；
     *      1：垂直居中；
     *      2：垂直居下。
     */
    LPAPI.prototype.setItemVerticalAlignment = function (nNewValue) {
        this.dtPrinter.ItemVerticalAlignment = nNewValue;
    };

    /**
     *  打开指定名称的打印机对象。
     * @param printerName 打印机名称
     *  为 NULL 或空字符串时，函数会自动搜索当前系统安装的第一个 LPAPI 支持的打印机。当指定打印机名称时，函数会
     *  优先根据打印机名称进行完整匹配，如果没有匹配上，则函数会再次匹配以指定名称开始的、后面加上了 #1、#2 等字样的打印机名称对象。
     * @returns {boolean} 成功与否。
     */
    LPAPI.prototype.openPrinter = function (printerName) {
        return this.dtPrinter.OpenPrinter(printerName) == 0;
    };

    /**
     * 得到当前使用的打印机名称.
     * @returns {string} 当前使用的打印机名称。
     */
    LPAPI.prototype.getPrinterName = function () {
        return this.dtPrinter.GetPrinterName();
    };

    /**
     * 判断当前打印机是否打开。
     * @returns {bool}
     * true：成功。
     * false：失败。
     */
    LPAPI.prototype.isPrinterOpened = function () {
        return this.dtPrinter.IsPrinterOpened() == 0;
    };

    /**
     * 判断当前打印机是否在线
     * @returns {bool}
     * true：成功。
     * false：失败。
     */
    LPAPI.prototype.isPrinterOnline = function () {
        return this.dtPrinter.IsPrinterOnline() == 0;
    };

    /**
     * 关闭当前使用的打印机
     * 注意：关闭打印机时，当前还有未打印的任务/数据将会被自动提交打印，同时所有参数设置将会被保留。
     */
    LPAPI.prototype.closePrinter = function () {
        this.dtPrinter.ClosePrinter();
    };

    /**
     * 得到支持的打印机名称.
     * @param onlyOnline 是否仅仅返回已连接至电脑的打印机？
     * @returns {string}
     * 本机安装的所有打印机名称，多个打印机名称之间用逗号分隔。
     */
    LPAPI.prototype.getSupportedPrinters = function (onlyOnline) {
        onlyOnline = (onlyOnline === undefined ? false : onlyOnline);
        this.init();

        try {
            return this.dtPrinter.GetSupportedPrinters(onlyOnline);
        } catch (e) {
            alert("未检测到标签打印机插件，请注册插件（不支持非IE浏览器）！\n" + e.toString());
        }

        return false;
    };

    /**
     *  得到本机安装的所有打印机名称.
     * @param onlyOnline 是否仅仅返回已连接的打印机？
     * @returns {string}
     * 本机安装的所有打印机名称，多个打印机名称之间用逗号分隔。
     */
    LPAPI.prototype.getAllPrinters = function (onlyOnline) {
        onlyOnline = (onlyOnline === undefined ? false : onlyOnline);
        this.init();

        try {
            return this.dtPrinter.GetAllPrinters(onlyOnline);
        } catch (e) {
            alert("未检测到标签打印机插件，请注册插件（不支持非IE浏览器）！\n" + e.toString());
        }

        return false;
    };

    /**
    LPAPI.prototype.getParam = function(paramID) {
        return this.dtPrinter.GetParam(paramID);
    }
    
    LPAPI.prototype.setParam = function(paramID, paramValue) {
        return this.dtPrinter.SetParam(paramID, paramValue);
    } */
    /**
     * 判断当前打印机是否是博思得台式机，博思得台式机与我们的小票机坐标系相差180度；
     */
    LPAPI.prototype.isPostek = function () {
        var printerName = this.getPrinterName() || "";
        if (/^\s*POSTEK/i.test(printerName))
            return true;

        return false;
    };
    /**
     * 判断当前打印机是否是理念的标牌机。
     */
    LPAPI.prototype.isIT2600 = function () {
        var printerName = this.getPrinterName() || "";
        if (/\.*iT-2600/i.test(printerName))
            return true;
        if (/\.*Magicard Enduro/i.test(printerName))
            return true;
        if (/\.*ING171/i.test(printerName))
            return true;

        return false;
    };
    /**
     * 开始一打印任务.
     * @param width 标签宽度（基于打印视图，不考虑标签旋转。单位毫米(mm)）。
     * @param height 标签高度（基于打印视图，不考虑标签旋转。单位毫米(mm)）。
     * @param orientation 提交打印时标签页面的顺时针旋转角度，0/90/180/270。
     * @param jobName 打印任务名称。
     * @returns {bool}
     * true：成功。
     * false：失败。
     *  使用说明：开始打印任务时，如果没有打开打印机对象，则本函数会自动打开当前系统安装的第一个 LPAPI 支持的打印机，用于打印。
     *  开始打印任务时，当前还有未打印的任务/数据将会被全部丢弃。
     */
    LPAPI.prototype.startJob = function (width, height, orientation, jobName) {
        orientation = (orientation === undefined ? 0 : orientation);
        jobName = (jobName === undefined ? "" : jobName);
        if (this.isPostek())
            orientation += 180;
        else if (this.isIT2600())
            orientation += 90;

        return this.dtPrinter.StartJob(width * 100, height * 100, 30, orientation, 1, jobName) == 0;
    };

    /**
     *  取消一打印任务
     *  使用说明：当前还有未打印的任务/数据将会被全部丢弃，但是所有参数设置将会被保留。
     */
    LPAPI.prototype.abortJob = function () {
        this.dtPrinter.AbortJob();
    };

    /**
     * 提交打印任务，进行真正的打印。
     * @returns {bool}
     * true：成功。
     * false：失败。
     */
    LPAPI.prototype.commitJob = function () {
        return this.dtPrinter.CommitJob() == 0;
    };

    /**
     * 开始一打印页面。
     * @returns {bool}
     * true：成功。
     * false：失败。
     *  使用说明：如果之前没有调用 StartJob，则本函数会自动调用 StartJob，然后再开始一打印页面。此后调用 EndPage 结束打印时，打印任务会被自动提交打印。
     *  页面旋转角度非 0 打印时，必须在打印动作之前设置打印页面尺寸信息。
     */
    LPAPI.prototype.startPage = function () {
        return this.dtPrinter.StartPage() == 0;
    };

    /**
     * 结束一打印页面。
     *  使用注意：如果之前没有调用 StartJob 而直接调用 StartPage，则本函数会自动提交打印。
     */
    LPAPI.prototype.endPage = function () {
        this.dtPrinter.EndPage();
    };

    /*********************************************************************
     * 绘制相关内容。
     *********************************************************************/
    /**
     * 打印文本字符串
     * @param text 需要打印的文本字符串。
     * @param x 打印矩形框水平位置（单位毫米(mm)）。
     * @param y 打印矩形框垂直位置（单位毫米(mm)）。
     * @param width 打印矩形框水平宽度（单位毫米(mm)）。如果 width 为 0，则会根据打印文本的显示宽度，根据当前对齐方式进行以 x 为基准点的左中右对齐。
     * @param height 打印矩形框垂直高度（单位毫米(mm)）。如果 height 为 0，则会根据打印文本的显示高度，根据当前对齐方式进行以 y 为基准点的上中下对齐。
     * @param fontName 字体名称。为空时函数会自动按照下面的搜索顺序来对系统安装的字体进行搜索：微软雅黑、黑体、宋体、新宋体。
     * @param fontHeight 字体高度，单位毫米(mm)，不是字号。
     * @param fontStyle 字体风格，
     *  0：一般；
     *  1：粗体；
     *  2：斜体；
     *  3：粗斜体；
     *  4：下划线；
     *  8：删除线。
     * @returns {bool}
     * true：成功。
     * false：失败。
     *  使用注意：
     *      如果之前没有调用 StartPage 而直接进行打印，则打印函数会自动调用 StartPage 开始一打印页面，然后进行打印。
     *  	打印位置和宽度高度是基于当前页面的位置和方向，不考虑页面和打印动作的旋转角度。
     *      fontHeight是以像素或毫米为单位，单位毫米(mm)。字号和毫米的转换公式为：
     *          字号对应的打印高度（毫米）= 字号 * 25.4 / 72
     *          比方说 9 号字为 3.175 毫米，12 号字为 4.233 毫米
     */
    LPAPI.prototype.drawText = function (text, x, y, width, height, fontName, fontHeight, fontStyle) {
        if (!fontName) fontName = "黑体";
        if (!fontHeight) fontHeight = height;
        if (!fontStyle) fontStyle = 0;
        return this.dtPrinter.DrawText(text, x * 100, y * 100, width * 100, height * 100, fontName, fontHeight * 100, fontStyle) == 0;
    };

    /**
     * 打印一维条码。
     * @param text 需要打印的文本字符串。
     * @param type 条码编码类型 ，参考条码类型。
     * @param x 打印一维码水平位置（单位毫米(mm)）。
     * @param y 打印一维码垂直位置（单位毫米(mm)）。
     * @param width 打印一维码水平宽度（单位毫米(mm)）。
     * @param height 打印一维码垂直高度（单位毫米(mm)）。
     * @param textHeight 供人识读文本的高度（单位毫米(mm)）。
     * @returns {bool}
     * true：成功。
     * false：失败。
     *  @使用注意：
     *   	如果之前没有调用 StartPage 而直接进行打印，则打印函数会自动调用 StartPage 开始一打印页面，然后进行打印。
     *	    打印位置和宽度高度是基于当前页面的位置和方向，不考虑页面和打印动作的旋转角度。
     *      默认的条码和供人识读文本之间的距离是供人识读文本的 1/4 高度。
     */
    LPAPI.prototype.draw1DBarcode = function (text, type, x, y, width, height, textHeight) {
        if (type <= 20 || type > 60) type = 60;
        if (textHeight === undefined) textHeight = 3;
        return this.dtPrinter.Draw1DBarcode(text, type, x * 100, y * 100, width * 100, height * 100, textHeight * 100) == 0;
    };

    /**
     * 打印 QrCode 二维码。
     * @param text 需要打印的二维码内容。
     * @param x 打印二维码水平位置（单位毫米(mm)）。
     * @param y 打印二维码垂直位置（单位毫米(mm)）。
     * @param width 打印二维码水平宽度（单位毫米(mm)）。如果 width 为 0，则会根据二维码的显示宽度（二维码点宽度为0.25毫米），根据当前对齐方式进行以 x 为基准点的左中右对齐。
     * @param height 打印二维码垂直高度（单位毫米(mm)）。如果 height 为 0，则会根据二维码的显示宽度（二维码点宽度为0.25毫米），根据当前对齐方式进行以 y 为基准点的上中下对齐。
     * @returns {bool}
     * true：成功。
     * false：失败。
     * @使用注意：
     *      如果之前没有调用 StartPage 而直接进行打印，则打印函数会自动调用 StartPage 开始一打印页面，然后进行打印。
     *      打印位置和宽度高度是基于当前页面的位置和方向，不考虑页面和打印动作的旋转角度。
     */
    LPAPI.prototype.draw2DQRCode = function (text, x, y, width, height) {
        if (height === undefined) height = width;
        return this.dtPrinter.Draw2DQRCode(text, x * 100, y * 100, width * 100, height * 100) == 0;
    };

    /**
     * 打印 Pdf417 二维码。
     * @param text 需要打印的二维码内容。
     * @param x 打印二维码水平位置（单位毫米(mm)）。
     * @param y 打印二维码垂直位置（单位毫米(mm)）。
     * @param width 打印二维码水平宽度（单位毫米(mm)）。如果 width 为 0，则会根据二维码的显示宽度（二维码点宽度为0.25毫米），根据当前对齐方式进行以 x 为基准点的左中右对齐。
     * @param height 打印二维码垂直高度（单位毫米(mm)）。如果 height 为 0，则会根据二维码的显示宽度（二维码点宽度为0.25毫米），根据当前对齐方式进行以 y 为基准点的上中下对齐。
     * @returns {bool}
     * true：成功。
     * false：失败。
     * @使用注意：
     *      如果之前没有调用 StartPage 而直接进行打印，则打印函数会自动调用 StartPage开始一打印页面，然后进行打印。
     *      打印位置和宽度高度是基于当前页面的位置和方向，不考虑页面和打印动作的旋转角度。
     */
    LPAPI.prototype.draw2DPdf417 = function (text, x, y, width, height) {
        return this.dtPrinter.Draw2DPdf417(text, x * 100, y * 100, width * 100, height * 100) == 0;
    };

    /**
     * 以指定的线宽，打印矩形框。
     * @param x 打印矩形框水平位置（单位毫米(mm)）。
     * @param y 打印矩形框垂直位置（单位毫米(mm)）。
     * @param width 打印矩形框水平宽度（单位毫米(mm)）。
     * @param height 打印矩形框垂直高度（单位毫米(mm)）。
     * @param lineWidth 矩形框的线宽（单位毫米(mm)）。矩形框的线宽是向矩形框内部延伸的。
     * @returns {bool}
     * true：成功。
     * false：失败。
     * @使用注意：
     *       如果之前没有调用 StartPage 而直接进行打印，则打印函数会自动调用 StartPage开始一打印页面，然后进行打印。
     *       打印位置和宽度高度是基于当前页面的位置和方向，不考虑页面和打印动作的旋转角度。
     */
    LPAPI.prototype.drawRectangle = function (x, y, width, height, lineWidth) {
        if (lineWidth === undefined) lineWidth = 0.5;
        return this.dtPrinter.DrawRectangle(x * 100, y * 100, width * 100, height * 100, lineWidth * 100) == 0;
    };

    /**
     * 打印填充的矩形框。
     * @param x 打印矩形框水平位置（单位毫米(mm)）。
     * @param y 打印矩形框垂直位置（单位毫米(mm)）。
     * @param width 打印矩形框水平宽度（单位毫米(mm)）。
     * @param height 打印矩形框垂直高度（单位毫米(mm)）。
     * @returns {bool}
     * true：成功。
     * false：失败。
     * @使用注意：
     *       如果之前没有调用 StartPage 而直接进行打印，则打印函数会自动调用 StartPage开始一打印页面，然后进行打印。
     *       打印位置和宽度高度是基于当前页面的位置和方向，不考虑页面和打印动作的旋转角度。
     */
    LPAPI.prototype.fillRectangle = function (x, y, width, height) {
        return this.dtPrinter.FillRectangle(x * 100, y * 100, width * 100, height * 100) == 0;
    };

    /**
     * 以指定的线宽，打印圆角矩形框
     * @param x 打印矩形框水平位置（单位毫米(mm)）。
     * @param y 打印矩形框垂直位置（单位毫米(mm)）。
     * @param width 打印矩形框水平宽度（单位毫米(mm)）。
     * @param height 打印矩形框垂直高度（单位毫米(mm)）。
     * @param cornerWidth 圆角宽度（单位毫米(mm)）。
     * @param cornerHeight 圆角高度（单位毫米(mm)）。
     * @param lineWidth 圆角矩形框的线宽（单位毫米(mm)）。圆角矩形框的线宽是向圆角矩形框内部延伸的。
     * @returns {bool}
     * true：成功。
     * false：失败。
     * @使用注意：
     *       如果之前没有调用 StartPage 而直接进行打印，则打印函数会自动调用 StartPage开始一打印页面，然后进行打印。
     *       打印位置和宽度高度是基于当前页面的位置和方向，不考虑页面和打印动作的旋转角度。
     */
    LPAPI.prototype.drawRoundRectangle = function (x, y, width, height, cornerWidth, cornerHeight, lineWidth) {
        if (cornerWidth === undefined) cornerWidth = 1.5;
        if (cornerHeight === undefined) cornerHeight = cornerWidth;
        if (lineWidth === undefined) lineWidth = 0.5;
        return this.dtPrinter.DrawRoundRectangle(x * 100, y * 100, width * 100, height * 100, cornerWidth * 100, cornerHeight * 100, lineWidth * 100) == 0;
    };

    /**
     * 打印填充的圆角矩形框
     * @param x 打印圆角矩形框水平位置（单位毫米(mm)）。
     * @param y 打印圆角矩形框垂直位置（单位毫米(mm)）。
     * @param width 打印圆角矩形框水平宽度（单位毫米(mm)）。
     * @param height 打印圆角矩形框垂直高度（单位毫米(mm)）。
     * @param cornerWidth 圆角宽度（单位毫米(mm)）。
     * @param cornerHeight 圆角高度（单位毫米(mm)）。
     * @returns {bool}
     * true：成功。
     * false：失败。
     * @使用注意：
     *       如果之前没有调用 StartPage 而直接进行打印，则打印函数会自动调用 StartPage开始一打印页面，然后进行打印。
     *       打印位置和宽度高度是基于当前页面的位置和方向，不考虑页面和打印动作的旋转角度。
     */
    LPAPI.prototype.fillRoundRectangle = function (x, y, width, height, cornerWidth, cornerHeight) {
        if (cornerWidth === undefined) cornerWidth = 1.5;
        if (cornerHeight === undefined) cornerHeight = cornerWidth;
        return this.dtPrinter.FillRoundRectangle(x * 100, y * 100, width * 100, height * 100, cornerWidth * 100, cornerHeight * 100) == 0;
    };

    /**
     * 以指定的线宽，打印椭圆/圆
     * @param x 打印椭圆矩形框水平位置（单位毫米(mm)）。
     * @param y 打印椭圆矩形框垂直位置（单位毫米(mm)）。
     * @param width 打印椭圆矩形框水平宽度（单位毫米(mm)）。
     * @param height 打印椭圆矩形框垂直高度（单位毫米(mm)）。
     * @param lineWidth 椭圆的线宽（单位毫米(mm)）。椭圆的线宽是向椭圆内部延伸的。
     * @returns {bool}
     * true：成功。
     * false：失败。
     * @使用注意：
     *       如果之前没有调用 StartPage 而直接进行打印，则打印函数会自动调用 StartPage开始一打印页面，然后进行打印。
     *       打印位置和宽度高度是基于当前页面的位置和方向，不考虑页面和打印动作的旋转角度。
     *       width 和 height 相等时就是打印圆。
     */
    LPAPI.prototype.drawEllipse = function (x, y, width, height, lineWidth) {
        if (lineWidth === undefined) lineWidth = 0.5;
        return this.dtPrinter.DrawEllipse(x * 100, y * 100, width * 100, height * 100, lineWidth * 100) == 0;
    };

    /**
     * 打印填充的椭圆/圆
     * @param x 打印椭圆矩形框水平位置（单位毫米(mm)）。
     * @param y 打印椭圆矩形框垂直位置（单位毫米(mm)）。
     * @param width 打印椭圆矩形框水平宽度（单位毫米(mm)）。
     * @param height 打印椭圆矩形框垂直高度（单位毫米(mm)）。
     * @returns {bool}
     * true：成功。
     * false：失败。
     * @使用注意：
     *       如果之前没有调用 StartPage 而直接进行打印，则打印函数会自动调用 StartPage开始一打印页面，然后进行打印。
     *       打印位置和宽度高度是基于当前页面的位置和方向，不考虑页面和打印动作的旋转角度。
     *       width 和 height 相等时就是打印圆。
     */
    LPAPI.prototype.fillEllipse = function (x, y, width, height) {
        return this.dtPrinter.FillEllipse(x * 100, y * 100, width * 100, height * 100) == 0;
    };

    /**
     *  打印线（直线/斜线）
     * @param x1 线的起点（单位毫米(mm)）。
     * @param y1 线的起点（单位毫米(mm)）。
     * @param x2 线的终点（单位毫米(mm)）。
     * @param y2 线的终点（单位毫米(mm)）。
     * @param lineWidth 线宽（单位毫米(mm)）。线宽是向线的下方延伸的。
     * @returns {bool}
     * true：成功。
     * false：失败。
     * @使用注意：
     *       如果之前没有调用 StartPage 而直接进行打印，则打印函数会自动调用 StartPage开始一打印页面，然后进行打印。
     *       打印位置和宽度高度是基于当前页面的位置和方向，不考虑页面和打印动作的旋转角度。
     */
    LPAPI.prototype.drawLine = function (x1, y1, x2, y2, lineWidth) {
        if (lineWidth === undefined) lineWidth = 0.5;
        return this.dtPrinter.DrawLine(x1 * 100, y1 * 100, x2 * 100, y2 * 100, lineWidth * 100) == 0;
    };

    //long drawDashLine(x1 : number, y1 : number, x2 : number, y2 : number, lineWidth : number, long FAR* dashLen, dashCount : number){return 0;}
    // LPAPI.prototype.DrawDashLine = function(x1, y1, x2, y2, lineWidth, dashLen, dashCount) {
    //     if (dashCount === undefined) dashCount = dashLen.length;
    //     var iDashLen = new Array();
    //     for(var i = 0; i < dashCount; i++){
    //         iDashLen[i] = dashLen[i] * 100;
    //     }
    //     try {
    //         return this.dtPrinter.DrawDashLine(x1 * 100, y1 * 100, x2 * 100, y2 * 100, lineWidth * 100, iDashLen, dashCount) == 0;
    //     } catch (e){
    //         alert(e.toString());
    //     }
    // };

    /**
     *  打印点划线
     * @param x1 线的起点（单位毫米(mm)）。
     * @param y1 线的起点（单位毫米(mm)）。
     * @param x2 线的终点（单位毫米(mm)）。
     * @param y2 线的终点（单位毫米(mm)）。
     * @param lineWidth 线宽（单位毫米(mm)）。线宽是向线的下方延伸的。
     * @param dashLen1 点划线第一段的长度（单位毫米(mm)）。
     * @param dashLen2 点划线第二段的长度（单位毫米(mm)）。
     * @returns {bool}
     * true：成功。
     * false：失败。
     * @使用注意：
     *       如果之前没有调用 StartPage 而直接进行打印，则打印函数会自动调用 StartPage开始一打印页面，然后进行打印。
     *       打印位置和宽度高度是基于当前页面的位置和方向，不考虑页面和打印动作的旋转角度。
     */
    LPAPI.prototype.drawDashLine2 = function (x1, y1, x2, y2, lineWidth, dashLen1, dashLen2) {
        lineWidth = (lineWidth ? lineWidth : 0.5);
        dashLen1 = (dashLen1 ? dashLen1 : 0.5);
        dashLen2 = (dashLen2 ? dashLen2 : dashLen1 * 0.5);
        return this.dtPrinter.DrawDashLine2(x1 * 100, y1 * 100, x2 * 100, y2 * 100, lineWidth * 100, dashLen1 * 100, dashLen2 * 100) == 0;
    };

    /**
     *  打印点划线
     * @param x1 线的起点（单位毫米(mm)）。
     * @param y1 线的起点（单位毫米(mm)）。
     * @param x2 线的终点（单位毫米(mm)）。
     * @param y2 线的终点（单位毫米(mm)）。
     * @param lineWidth 线宽（单位毫米(mm)）。线宽是向线的下方延伸的。
     * @param dashLen1 点划线第一段的长度（单位毫米(mm)）。
     * @param dashLen2 点划线第二段的长度（单位毫米(mm)）。
     * @param dashLen3 点划线第三段的长度（单位毫米(mm)）。
     * @param dashLen4 点划线第四段的长度（单位毫米(mm)）。
     * @returns {bool}
     * true：成功。
     * false：失败。
     * @使用注意：
     *       如果之前没有调用 StartPage 而直接进行打印，则打印函数会自动调用 StartPage开始一打印页面，然后进行打印。
     *       打印位置和宽度高度是基于当前页面的位置和方向，不考虑页面和打印动作的旋转角度。
     */
    LPAPI.prototype.drawDashLine4 = function (x1, y1, x2, y2, lineWidth, dashLen1, dashLen2, dashLen3, dashLen4) {
        lineWidth = (lineWidth ? lineWidth : 0.5);
        dashLen1 = (dashLen1 ? dashLen1 : 0.5);
        dashLen2 = (dashLen2 ? dashLen2 : dashLen1);
        dashLen3 = (dashLen3 ? dashLen3 : dashLen1 * 0.5);
        dashLen4 = (dashLen4 ? dashLen4 : dashLen1 * 0.5);
        return this.dtPrinter.DrawDashLine4(x1 * 100, y1 * 100, x2 * 100, y2 * 100, lineWidth * 100, dashLen1 * 100, dashLen2 * 100, dashLen3 * 100, dashLen4 * 100) == 0;
    };

    /**
     *  打印指定文件的图片
     * @param imageFile 位图文件路径名称，图片类型支持 bmp, jpg, gif, png, tiff 等常见位图文件格式。路径类型支持：本地文件路径和URL路径。
     * @param x 打印位图水平位置（单位毫米(mm)）。
     * @param y 打印位图垂直位置（单位毫米(mm)）。
     * @param width 打印位图水平宽度（单位毫米(mm)）。如果 width 为 0，则采用加载的位图的宽度。
     * @param height 打印位图垂直高度（单位毫米(mm)）。如果 height 为 0，则采用加载的位图的高度。
     * @param threshold 黑白打印的灰度阀值。0 表示使用参数设置中的值；256 表示取消黑白打印，用灰度打印；257 表示直接打印图片原来的颜色。
     * @returns {bool}
     * true：成功。
     * false：失败。
     * @使用注意：
     *       如果之前没有调用 StartPage 而直接进行打印，则打印函数会自动调用 StartPage开始一打印页面，然后进行打印。
     *       打印位置和宽度高度是基于当前页面的位置和方向，不考虑页面和打印动作的旋转角度。
     *       图片打印时会被缩放到指定的宽度和高度。
     *       标签打印都是黑白打印，因此位图会被转变成灰度图片（RGB三分量相同，0～255取值的颜色）之后，然后根据一阀值将位图再次转换黑白位图再进行打印。默认灰度阀值为 192，也就是说 >= 192 的会被认为是白色，而 < 192 的会被认为是黑色。
     */
    LPAPI.prototype.drawImage = function (imageFile, x, y, width, height, threshold) {
        if (threshold === undefined) threshold = 192;
        return this.dtPrinter.DrawImage(imageFile, x * 100, y * 100, width * 100, height * 100, threshold) == 0;
    };

module.exports = LPAPI;