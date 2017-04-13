"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JwtTokenService = (function () {
    function JwtTokenService() {
        var _this = this;
        this.getJwtClaims = function (encodedToken) {
            var jwtToken = _this.createJwtToken(encodedToken);
            var base64Decoded = _this.decodeBase64String(jwtToken.payload);
            return JSON.parse(base64Decoded);
        };
        this.createJwtToken = function (token) {
            var jwtTokenPartsRegex = /^([^\.\s]*)\.([^\.\s]+)\.([^\.\s]*)$/;
            var matches = jwtTokenPartsRegex.exec(token);
            var isValidToken = matches && matches.length === 4;
            return {
                header: isValidToken ? matches[1] : '',
                payload: isValidToken ? matches[2] : '',
                signature: isValidToken ? matches[3] : ''
            };
        };
        this.decodeBase64String = function (base64IdToken) {
            base64IdToken = base64IdToken.replace(/-/g, '+').replace(/_/g, '/');
            if (!window.atob) {
                throw new Error('Browser doesn\'t implement atob');
            }
            return window.atob(base64IdToken);
        };
    }
    return JwtTokenService;
}());
exports.default = JwtTokenService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImp3dC10b2tlbi1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBTUE7SUFBQTtRQUFBLGlCQTZCQztRQTVCVSxpQkFBWSxHQUFHLFVBQUMsWUFBb0I7WUFDdkMsSUFBSSxRQUFRLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNqRCxJQUFJLGFBQWEsR0FBRyxLQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRTlELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQztRQUVNLG1CQUFjLEdBQUcsVUFBQyxLQUFhO1lBQ25DLElBQUksa0JBQWtCLEdBQUcsc0NBQXNDLENBQUM7WUFDaEUsSUFBSSxPQUFPLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdDLElBQUksWUFBWSxHQUFHLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztZQUVuRCxNQUFNLENBQVk7Z0JBQ2QsTUFBTSxFQUFFLFlBQVksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRTtnQkFDdEMsT0FBTyxFQUFFLFlBQVksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRTtnQkFDdkMsU0FBUyxFQUFFLFlBQVksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRTthQUM1QyxDQUFDO1FBQ04sQ0FBQyxDQUFDO1FBRU0sdUJBQWtCLEdBQUcsVUFBQyxhQUFxQjtZQUMvQyxhQUFhLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztZQUVwRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztZQUN2RCxDQUFDO1lBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUFELHNCQUFDO0FBQUQsQ0E3QkEsQUE2QkMsSUFBQSIsImZpbGUiOiJqd3QtdG9rZW4tc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImludGVyZmFjZSBJSnd0VG9rZW4ge1xyXG4gICAgaGVhZGVyOiBzdHJpbmc7XHJcbiAgICBwYXlsb2FkOiBzdHJpbmc7XHJcbiAgICBzaWduYXR1cmU6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSnd0VG9rZW5TZXJ2aWNlIHsgICAgXHJcbiAgICBwdWJsaWMgZ2V0Snd0Q2xhaW1zID0gKGVuY29kZWRUb2tlbjogc3RyaW5nKTogSUp3dENsYWltcyA9PiB7XHJcbiAgICAgICAgdmFyIGp3dFRva2VuID0gdGhpcy5jcmVhdGVKd3RUb2tlbihlbmNvZGVkVG9rZW4pO1xyXG4gICAgICAgIHZhciBiYXNlNjREZWNvZGVkID0gdGhpcy5kZWNvZGVCYXNlNjRTdHJpbmcoand0VG9rZW4ucGF5bG9hZCk7XHJcblxyXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGJhc2U2NERlY29kZWQpO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZUp3dFRva2VuID0gKHRva2VuOiBzdHJpbmcpOiBJSnd0VG9rZW4gPT4ge1xyXG4gICAgICAgIHZhciBqd3RUb2tlblBhcnRzUmVnZXggPSAvXihbXlxcLlxcc10qKVxcLihbXlxcLlxcc10rKVxcLihbXlxcLlxcc10qKSQvO1xyXG4gICAgICAgIHZhciBtYXRjaGVzID0gand0VG9rZW5QYXJ0c1JlZ2V4LmV4ZWModG9rZW4pO1xyXG4gICAgICAgIHZhciBpc1ZhbGlkVG9rZW4gPSBtYXRjaGVzICYmIG1hdGNoZXMubGVuZ3RoID09PSA0O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiA8SUp3dFRva2VuPntcclxuICAgICAgICAgICAgaGVhZGVyOiBpc1ZhbGlkVG9rZW4gPyBtYXRjaGVzWzFdIDogJycsXHJcbiAgICAgICAgICAgIHBheWxvYWQ6IGlzVmFsaWRUb2tlbiA/IG1hdGNoZXNbMl0gOiAnJyxcclxuICAgICAgICAgICAgc2lnbmF0dXJlOiBpc1ZhbGlkVG9rZW4gPyBtYXRjaGVzWzNdIDogJydcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIGRlY29kZUJhc2U2NFN0cmluZyA9IChiYXNlNjRJZFRva2VuOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gICAgICAgIGJhc2U2NElkVG9rZW4gPSBiYXNlNjRJZFRva2VuLnJlcGxhY2UoLy0vZywgJysnKS5yZXBsYWNlKC9fL2csICcvJyk7XHJcblxyXG4gICAgICAgIGlmICghd2luZG93LmF0b2IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCcm93c2VyIGRvZXNuXFwndCBpbXBsZW1lbnQgYXRvYicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5hdG9iKGJhc2U2NElkVG9rZW4pO1xyXG4gICAgfTtcclxufSJdfQ==
