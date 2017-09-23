function LPAPI() {
    this.init();
}

LPAPI.prototype = {
    init: function () {
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
    },
    getItemOrientation: function () {
        return this.dtPrinter.ItemOrientation;
    },
    setItemOrientation: function (nNewValue) {
        this.dtPrinter.ItemOrientation = nNewValue;
    },
    getItemHorizontalAlignment: function () {
        return this.dtPrinter.ItemHorizontalAlignment;
    },
    setItemHorizontalAlignment: function (nNewValue) {
        this.dtPrinter.ItemHorizontalAlignment = nNewValue;
    },
    getItemVerticalAlignment: function () {
        return this.dtPrinter.ItemVerticalAlignment;
    },
    setItemVerticalAlignment: function (nNewValue) {
        this.dtPrinter.ItemVerticalAlignment = nNewValue;
    },
    openPrinter: function (printerName) {
        return this.dtPrinter.OpenPrinter(printerName) == 0;
    },
    getPrinterName: function () {
        return this.dtPrinter.GetPrinterName();
    },
    isPrinterOpened: function () {
        return this.dtPrinter.IsPrinterOpened() == 0;
    },
    isPrinterOnline: function () {
        return this.dtPrinter.IsPrinterOnline() == 0;
    },
    closePrinter: function () {
        this.dtPrinter.ClosePrinter();
    },
    getSupportedPrinters: function (onlyOnline) {
        onlyOnline = (onlyOnline === undefined ? false : onlyOnline);
        this.init();

        try {
            return this.dtPrinter.GetSupportedPrinters(onlyOnline);
        } catch (e) {
            alert("未检测到标签打印机插件，请关闭浏览器后重新运行驱动程序（不支持非IE浏览器）！\n" + e.toString());
        }

        return false;
    },
    getAllPrinters: function (onlyOnline) {
        onlyOnline = (onlyOnline === undefined ? false : onlyOnline);
        this.init();

        try {
            return this.dtPrinter.GetAllPrinters(onlyOnline);
        } catch (e) {
            alert("未检测到标签打印机插件，请关闭浏览器后重新运行驱动程序（不支持非IE浏览器）！\n" + e.toString());
        }

        return false;
    },
    isC168Printer: function () {
        var printerName = this.getPrinterName() || "";
        if (/^\s*POSTEK C168/i.test(printerName))
            return true;
        if (/^\s*POSTEK C200/i.test(printerName))
            return true;
        if (/^\s*POSTEK L Series/i.test(printerName))
            return true;
        if (/^\s*POSTEK G3000/i.test(printerName))
            return true;

        return false;
    },
    isIT2600: function () {
        var printerName = this.getPrinterName() || "";
        if (/\.*iT-2600/i.test(printerName))
            return true;
        if (/\.*Magicard Enduro/i.test(printerName))
            return true;
        if (/\.*ING171/i.test(printerName))
            return true;

        return false;
    },
    startJob: function (width, height, orientation, jobName) {
        orientation = (orientation === undefined ? 0 : orientation);
        jobName = (jobName === undefined ? "" : jobName);
        // 博思得打印机与我们的打印西坐标系相差180度；
        if (this.isC168Printer())
            orientation += 180;
        else if (this.isIT2600())
            orientation += 90;

        return this.dtPrinter.StartJob(width * 100, height * 100, 30, orientation, 1, jobName) == 0;
    },
    abortJob: function () {
        this.dtPrinter.AbortJob();
    },
    commitJob: function () {
        return this.dtPrinter.CommitJob() == 0;
    },
    startPage: function () {
        return this.dtPrinter.StartPage() == 0;
    },
    endPage: function () {
        this.dtPrinter.EndPage();
    },
    drawText: function (text, x, y, width, height, fontName, fontHeight, fontStyle) {
        if (!fontName) fontName = "黑体";
        if (!fontHeight) fontHeight = height;
        if (!fontStyle) fontStyle = 0;
        return this.dtPrinter.DrawText(text, x * 100, y * 100, width * 100, height * 100, fontName, fontHeight * 100, fontStyle) == 0;
    },
    draw1DBarcode: function (text, type, x, y, width, height, textHeight) {
        if (type <= 20 || type > 60) type = 60;
        if (textHeight === undefined) textHeight = 3;
        return this.dtPrinter.Draw1DBarcode(text, type, x * 100, y * 100, width * 100, height * 100, textHeight * 100) == 0;
    },
    draw2DQRCode: function (text, x, y, width, height) {
        if (height === undefined) height = width;
        return this.dtPrinter.Draw2DQRCode(text, x * 100, y * 100, width * 100, height * 100) == 0;
    },
    draw2DPdf417: function (text, x, y, width, height) {
        return this.dtPrinter.Draw2DPdf417(text, x * 100, y * 100, width * 100, height * 100) == 0;
    },
    drawRectangle: function (x, y, width, height, lineWidth) {
        if (lineWidth === undefined) lineWidth = 0.5;
        return this.dtPrinter.DrawRectangle(x * 100, y * 100, width * 100, height * 100, lineWidth * 100) == 0;
    },
    fillRectangle: function (x, y, width, height) {
        return this.dtPrinter.FillRectangle(x * 100, y * 100, width * 100, height * 100) == 0;
    },
    drawRoundRectangle: function (x, y, width, height, cornerWidth, cornerHeight, lineWidth) {
        if (cornerWidth === undefined) cornerWidth = 1.5;
        if (cornerHeight === undefined) cornerHeight = cornerWidth;
        if (lineWidth === undefined) lineWidth = 0.5;
        return this.dtPrinter.DrawRoundRectangle(x * 100, y * 100, width * 100, height * 100, cornerWidth * 100, cornerHeight * 100, lineWidth * 100) == 0;
    },
    fillRoundRectangle: function (x, y, width, height, cornerWidth, cornerHeight) {
        if (cornerWidth === undefined) cornerWidth = 1.5;
        if (cornerHeight === undefined) cornerHeight = cornerWidth;
        return this.dtPrinter.FillRoundRectangle(x * 100, y * 100, width * 100, height * 100, cornerWidth * 100, cornerHeight * 100) == 0;
    },
    drawEllipse: function (x, y, width, height, lineWidth) {
        if (lineWidth === undefined) lineWidth = 0.5;
        return this.dtPrinter.DrawEllipse(x * 100, y * 100, width * 100, height * 100, lineWidth * 100) == 0;
    },
    fillEllipse: function (x, y, width, height) {
        return this.dtPrinter.FillEllipse(x * 100, y * 100, width * 100, height * 100) == 0;
    },
    drawLine: function (x1, y1, x2, y2, lineWidth) {
        if (lineWidth === undefined) lineWidth = 0.5;
        return this.dtPrinter.DrawLine(x1 * 100, y1 * 100, x2 * 100, y2 * 100, lineWidth * 100) == 0;
    },
    drawDashLine2: function (x1, y1, x2, y2, lineWidth, dashLen1, dashLen2) {
        lineWidth = (lineWidth ? lineWidth : 0.5);
        dashLen1 = (dashLen1 ? dashLen1 : 0.5);
        dashLen2 = (dashLen2 ? dashLen2 : dashLen1 * 0.5);
        return this.dtPrinter.DrawDashLine2(x1 * 100, y1 * 100, x2 * 100, y2 * 100, lineWidth * 100, dashLen1 * 100, dashLen2 * 100) == 0;
    },
    drawDashLine4: function (x1, y1, x2, y2, lineWidth, dashLen1, dashLen2, dashLen3, dashLen4) {
        lineWidth = (lineWidth ? lineWidth : 0.5);
        dashLen1 = (dashLen1 ? dashLen1 : 0.5);
        dashLen2 = (dashLen2 ? dashLen2 : dashLen1);
        dashLen3 = (dashLen3 ? dashLen3 : dashLen1 * 0.5);
        dashLen4 = (dashLen4 ? dashLen4 : dashLen1 * 0.5);
        return this.dtPrinter.DrawDashLine4(x1 * 100, y1 * 100, x2 * 100, y2 * 100, lineWidth * 100, dashLen1 * 100, dashLen2 * 100, dashLen3 * 100, dashLen4 * 100) == 0;
    },
    drawImage: function (imageFile, x, y, width, height, threshold) {
        if (threshold === undefined) threshold = 192;
        return this.dtPrinter.DrawImage(imageFile, x * 100, y * 100, width * 100, height * 100, threshold) == 0;
    }
};

module.exports = LPAPI;