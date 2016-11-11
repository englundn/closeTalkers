'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import React from 'react';
// import ReactDOM from 'react-dom';

var esURL = 'http://1b4f84fecd657bad91626e9aa8f74e59.us-west-1.aws.found.io:9200/test/test/AVhQ8_qA6vD3_5aG54Q7';

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      query: ''
    };
    _this.query = _this.query.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: 'handleChange',
    value: function handleChange(event) {
      this.setState({ query: event.target.value });
    }
  }, {
    key: 'query',
    value: function query(event) {
      var qs = this.state.query;
      console.log(qs);
      $.ajax({
        url: esURL,
        method: 'GET',
        dataType: 'jsonp',
        auth: {
          user: 'user1',
          pass: 'user11'
        },
        success: function success(data) {
          console.log(data);
        }
      });
      event.preventDefault();
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'form',
        { onSubmit: this.query },
        'Search:',
        React.createElement('input', { type: 'text', value: this.state.query, onChange: this.handleChange }),
        React.createElement('input', { type: 'submit', value: 'Submit' })
      );
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3B1YmxpYy9hcHAvQXBwLmpzIl0sIm5hbWVzIjpbImVzVVJMIiwiQXBwIiwicHJvcHMiLCJzdGF0ZSIsInF1ZXJ5IiwiYmluZCIsImhhbmRsZUNoYW5nZSIsImV2ZW50Iiwic2V0U3RhdGUiLCJ0YXJnZXQiLCJ2YWx1ZSIsInFzIiwiY29uc29sZSIsImxvZyIsIiQiLCJhamF4IiwidXJsIiwibWV0aG9kIiwiZGF0YVR5cGUiLCJhdXRoIiwidXNlciIsInBhc3MiLCJzdWNjZXNzIiwiZGF0YSIsInByZXZlbnREZWZhdWx0IiwiUmVhY3QiLCJDb21wb25lbnQiLCJSZWFjdERPTSIsInJlbmRlciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUNBOztBQUVBLElBQU1BLFFBQVEsb0dBQWQ7O0lBRU1DLEc7OztBQUNKLGVBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSwwR0FDWEEsS0FEVzs7QUFFakIsVUFBS0MsS0FBTCxHQUFhO0FBQ1hDLGFBQU87QUFESSxLQUFiO0FBR0EsVUFBS0EsS0FBTCxHQUFhLE1BQUtBLEtBQUwsQ0FBV0MsSUFBWCxPQUFiO0FBQ0EsVUFBS0MsWUFBTCxHQUFvQixNQUFLQSxZQUFMLENBQWtCRCxJQUFsQixPQUFwQjtBQU5pQjtBQU9sQjs7OztpQ0FFWUUsSyxFQUFPO0FBQ2xCLFdBQUtDLFFBQUwsQ0FBYyxFQUFFSixPQUFPRyxNQUFNRSxNQUFOLENBQWFDLEtBQXRCLEVBQWQ7QUFDRDs7OzBCQUVLSCxLLEVBQU87QUFDWCxVQUFNSSxLQUFLLEtBQUtSLEtBQUwsQ0FBV0MsS0FBdEI7QUFDQVEsY0FBUUMsR0FBUixDQUFZRixFQUFaO0FBQ0FHLFFBQUVDLElBQUYsQ0FBTztBQUNMQyxhQUFLaEIsS0FEQTtBQUVMaUIsZ0JBQVEsS0FGSDtBQUdMQyxrQkFBVSxPQUhMO0FBSUxDLGNBQU07QUFDSkMsZ0JBQU0sT0FERjtBQUVKQyxnQkFBTTtBQUZGLFNBSkQ7QUFRTEMsaUJBQVMsaUJBQUNDLElBQUQsRUFBVTtBQUNqQlgsa0JBQVFDLEdBQVIsQ0FBWVUsSUFBWjtBQUNEO0FBVkksT0FBUDtBQVlBaEIsWUFBTWlCLGNBQU47QUFDRDs7OzZCQUVRO0FBQ1AsYUFDRTtBQUFBO0FBQUEsVUFBTSxVQUFVLEtBQUtwQixLQUFyQjtBQUFBO0FBRUUsdUNBQU8sTUFBSyxNQUFaLEVBQW1CLE9BQU8sS0FBS0QsS0FBTCxDQUFXQyxLQUFyQyxFQUE0QyxVQUFVLEtBQUtFLFlBQTNELEdBRkY7QUFHRSx1Q0FBTyxNQUFLLFFBQVosRUFBcUIsT0FBTSxRQUEzQjtBQUhGLE9BREY7QUFPRDs7OztFQXhDZW1CLE1BQU1DLFM7O0FBMkN4QkMsU0FBU0MsTUFBVCxDQUFnQixvQkFBQyxHQUFELE9BQWhCLEVBQXlCQyxTQUFTQyxjQUFULENBQXdCLEtBQXhCLENBQXpCIiwiZmlsZSI6IkFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG4vLyBpbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcblxuY29uc3QgZXNVUkwgPSAnaHR0cDovLzFiNGY4NGZlY2Q2NTdiYWQ5MTYyNmU5YWE4Zjc0ZTU5LnVzLXdlc3QtMS5hd3MuZm91bmQuaW86OTIwMC90ZXN0L3Rlc3QvQVZoUThfcUE2dkQzXzVhRzU0UTcnO1xuXG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgcXVlcnk6ICcnLFxuICAgIH07XG4gICAgdGhpcy5xdWVyeSA9IHRoaXMucXVlcnkuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUNoYW5nZSA9IHRoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyk7XG4gIH1cblxuICBoYW5kbGVDaGFuZ2UoZXZlbnQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgcXVlcnk6IGV2ZW50LnRhcmdldC52YWx1ZSB9KTtcbiAgfVxuXG4gIHF1ZXJ5KGV2ZW50KSB7XG4gICAgY29uc3QgcXMgPSB0aGlzLnN0YXRlLnF1ZXJ5O1xuICAgIGNvbnNvbGUubG9nKHFzKTtcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiBlc1VSTCxcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBkYXRhVHlwZTogJ2pzb25wJyxcbiAgICAgIGF1dGg6IHtcbiAgICAgICAgdXNlcjogJ3VzZXIxJyxcbiAgICAgICAgcGFzczogJ3VzZXIxMScsXG4gICAgICB9LFxuICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICB9LFxuICAgIH0pO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxmb3JtIG9uU3VibWl0PXt0aGlzLnF1ZXJ5fT5cbiAgICAgICAgU2VhcmNoOlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiB2YWx1ZT17dGhpcy5zdGF0ZS5xdWVyeX0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfSAvPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiU3VibWl0XCIgLz5cbiAgICAgIDwvZm9ybT5cbiAgICApO1xuICB9XG59XG5cblJlYWN0RE9NLnJlbmRlcig8QXBwIC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpO1xuIl19