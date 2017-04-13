define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UrlHashService = (function () {
        function UrlHashService() {
            var _this = this;
            this.getHash = function () {
                var hash = window.location.hash;
                if (hash.indexOf('#/') > -1) {
                    hash = hash.substring(hash.indexOf('#/') + 2);
                }
                else if (hash.indexOf('#') > -1) {
                    hash = hash.substring(1);
                }
                return hash;
            };
            this.getHashData = function () {
                var hash = _this.getHash();
                var searchRegex = /([^&=]+)=?([^&]*)/g;
                var hashData = {};
                var match = searchRegex.exec(hash);
                while (match) {
                    var parameter = _this.decodeUrlData(match[1]);
                    var value = _this.decodeUrlData(match[2]);
                    hashData[parameter] = value;
                    match = searchRegex.exec(hash);
                }
                return hashData;
            };
            this.clearHash = function () {
                window.location.hash = '';
            };
            this.decodeUrlData = function (s) {
                return decodeURIComponent(s.replace(/\+/g, ' '));
            };
        }
        return UrlHashService;
    }());
    exports.default = UrlHashService;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVybC1oYXNoLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBQUE7UUFBQTtZQUFBLGlCQXFDQztZQXBDVSxZQUFPLEdBQUc7Z0JBQ2IsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7Z0JBRWhDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMxQixJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCxDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDaEMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLENBQUM7Z0JBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNoQixDQUFDLENBQUM7WUFFSyxnQkFBVyxHQUFHO2dCQUNqQixJQUFJLElBQUksR0FBRyxLQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzFCLElBQUksV0FBVyxHQUFHLG9CQUFvQixDQUFDO2dCQUN2QyxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7Z0JBRWxCLElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ25DLE9BQU8sS0FBSyxFQUFFLENBQUM7b0JBQ1gsSUFBSSxTQUFTLEdBQUcsS0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0MsSUFBSSxLQUFLLEdBQUcsS0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFekMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEtBQUssQ0FBQztvQkFDNUIsS0FBSyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ25DLENBQUM7Z0JBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUNwQixDQUFDLENBQUM7WUFFSyxjQUFTLEdBQUc7Z0JBQ2YsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQzlCLENBQUMsQ0FBQztZQUVNLGtCQUFhLEdBQUcsVUFBQyxDQUFTO2dCQUM5QixNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNyRCxDQUFDLENBQUM7UUFDTixDQUFDO1FBQUQscUJBQUM7SUFBRCxDQXJDQSxBQXFDQyxJQUFBIiwiZmlsZSI6InVybC1oYXNoLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBVcmxIYXNoU2VydmljZSB7XHJcbiAgICBwdWJsaWMgZ2V0SGFzaCA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gICAgICAgIHZhciBoYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2g7XHJcblxyXG4gICAgICAgIGlmIChoYXNoLmluZGV4T2YoJyMvJykgPiAtMSkge1xyXG4gICAgICAgICAgICBoYXNoID0gaGFzaC5zdWJzdHJpbmcoaGFzaC5pbmRleE9mKCcjLycpICsgMik7XHJcbiAgICAgICAgfSBlbHNlIGlmIChoYXNoLmluZGV4T2YoJyMnKSA+IC0xKSB7XHJcbiAgICAgICAgICAgIGhhc2ggPSBoYXNoLnN1YnN0cmluZygxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGhhc2g7XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0SGFzaERhdGEgPSAoKTogYW55ID0+IHtcclxuICAgICAgICB2YXIgaGFzaCA9IHRoaXMuZ2V0SGFzaCgpO1xyXG4gICAgICAgIHZhciBzZWFyY2hSZWdleCA9IC8oW14mPV0rKT0/KFteJl0qKS9nO1xyXG4gICAgICAgIHZhciBoYXNoRGF0YSA9IHt9O1xyXG5cclxuICAgICAgICB2YXIgbWF0Y2ggPSBzZWFyY2hSZWdleC5leGVjKGhhc2gpO1xyXG4gICAgICAgIHdoaWxlIChtYXRjaCkge1xyXG4gICAgICAgICAgICB2YXIgcGFyYW1ldGVyID0gdGhpcy5kZWNvZGVVcmxEYXRhKG1hdGNoWzFdKTtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5kZWNvZGVVcmxEYXRhKG1hdGNoWzJdKTtcclxuXHJcbiAgICAgICAgICAgIGhhc2hEYXRhW3BhcmFtZXRlcl0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgbWF0Y2ggPSBzZWFyY2hSZWdleC5leGVjKGhhc2gpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGhhc2hEYXRhO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgY2xlYXJIYXNoID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gJyc7XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgZGVjb2RlVXJsRGF0YSA9IChzOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocy5yZXBsYWNlKC9cXCsvZywgJyAnKSk7XHJcbiAgICB9O1xyXG59Il19
