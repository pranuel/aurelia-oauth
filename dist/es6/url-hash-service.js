System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var UrlHashService;
    return {
        setters: [],
        execute: function () {
            UrlHashService = (function () {
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
            exports_1("default", UrlHashService);
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVybC1oYXNoLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztZQUFBO2dCQUFBO29CQUFBLGlCQXFDQztvQkFwQ1UsWUFBTyxHQUFHO3dCQUNiLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO3dCQUVoQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDMUIsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDbEQsQ0FBQzt3QkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ2hDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM3QixDQUFDO3dCQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ2hCLENBQUMsQ0FBQztvQkFFSyxnQkFBVyxHQUFHO3dCQUNqQixJQUFJLElBQUksR0FBRyxLQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQzFCLElBQUksV0FBVyxHQUFHLG9CQUFvQixDQUFDO3dCQUN2QyxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7d0JBRWxCLElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ25DLE9BQU8sS0FBSyxFQUFFLENBQUM7NEJBQ1gsSUFBSSxTQUFTLEdBQUcsS0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDN0MsSUFBSSxLQUFLLEdBQUcsS0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFFekMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEtBQUssQ0FBQzs0QkFDNUIsS0FBSyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ25DLENBQUM7d0JBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQztvQkFDcEIsQ0FBQyxDQUFDO29CQUVLLGNBQVMsR0FBRzt3QkFDZixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7b0JBQzlCLENBQUMsQ0FBQztvQkFFTSxrQkFBYSxHQUFHLFVBQUMsQ0FBUzt3QkFDOUIsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ3JELENBQUMsQ0FBQztnQkFDTixDQUFDO2dCQUFELHFCQUFDO1lBQUQsQ0FyQ0EsQUFxQ0MsSUFBQTs7UUFBQSxDQUFDIiwiZmlsZSI6InVybC1oYXNoLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBVcmxIYXNoU2VydmljZSB7XHJcbiAgICBwdWJsaWMgZ2V0SGFzaCA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gICAgICAgIHZhciBoYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2g7XHJcblxyXG4gICAgICAgIGlmIChoYXNoLmluZGV4T2YoJyMvJykgPiAtMSkge1xyXG4gICAgICAgICAgICBoYXNoID0gaGFzaC5zdWJzdHJpbmcoaGFzaC5pbmRleE9mKCcjLycpICsgMik7XHJcbiAgICAgICAgfSBlbHNlIGlmIChoYXNoLmluZGV4T2YoJyMnKSA+IC0xKSB7XHJcbiAgICAgICAgICAgIGhhc2ggPSBoYXNoLnN1YnN0cmluZygxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGhhc2g7XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0SGFzaERhdGEgPSAoKTogYW55ID0+IHtcclxuICAgICAgICB2YXIgaGFzaCA9IHRoaXMuZ2V0SGFzaCgpO1xyXG4gICAgICAgIHZhciBzZWFyY2hSZWdleCA9IC8oW14mPV0rKT0/KFteJl0qKS9nO1xyXG4gICAgICAgIHZhciBoYXNoRGF0YSA9IHt9O1xyXG5cclxuICAgICAgICB2YXIgbWF0Y2ggPSBzZWFyY2hSZWdleC5leGVjKGhhc2gpO1xyXG4gICAgICAgIHdoaWxlIChtYXRjaCkge1xyXG4gICAgICAgICAgICB2YXIgcGFyYW1ldGVyID0gdGhpcy5kZWNvZGVVcmxEYXRhKG1hdGNoWzFdKTtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5kZWNvZGVVcmxEYXRhKG1hdGNoWzJdKTtcclxuXHJcbiAgICAgICAgICAgIGhhc2hEYXRhW3BhcmFtZXRlcl0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgbWF0Y2ggPSBzZWFyY2hSZWdleC5leGVjKGhhc2gpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGhhc2hEYXRhO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgY2xlYXJIYXNoID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gJyc7XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgZGVjb2RlVXJsRGF0YSA9IChzOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocy5yZXBsYWNlKC9cXCsvZywgJyAnKSk7XHJcbiAgICB9O1xyXG59Il19
