'use strict';
"use static";

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tools = require('usetools');
/**
 * 数据库模型操作类
 */

var Driver = function () {
	/**
  * 构造函数
  * @作者     como
  * @时间     2018-05-24
  * @版权     思智捷信息管理系统
  * @版本     1.0.0
  * @param  {Object}   config [description]
  * @return {[type]}          [description]
  */
	function Driver() {
		(0, _classCallCheck3.default)(this, Driver);

		/**
   * 用户条件参数
   * @type {Object}
   */
		this.options = {};
	}
	/**
  * 查询条件
  * @作者     como
  * @时间     2018-05-24
  * @版权     思智捷信息管理系统
  * @版本     1.0.0
  * @param  {Object}   objwhere [description]
  * @return {[type]}            [description]
  */


	(0, _createClass3.default)(Driver, [{
		key: 'where',
		value: function where() {
			var objwhere = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			var that = this;
			if (!tools.empty(objwhere)) {
				if (!that.options.where) {
					that.options.where = [];
				}
				that.options.where.push(objwhere);
			}
			return this;
		}
		/**
   * 查询字段
   * @作者     como
   * @时间     2018-05-24
   * @版权     思智捷信息管理系统
   * @版本     1.0.0
   * @param  {String}   fields [description]
   * @return {[type]}          [description]
   */

	}, {
		key: 'field',
		value: function field() {
			var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

			var that = this;
			if (!tools.empty(fields)) {
				that.options.field = fields;
			}
			return this;
		}
		/**
   * 限制字段
   * @作者     como
   * @时间     2018-05-24
   * @版权     思智捷信息管理系统
   * @版本     1.0.0
   * @param  {Number}   start [description]
   * @param  {Number}   end   [description]
   * @return {[type]}         [description]
   */

	}, {
		key: 'limit',
		value: function limit() {
			var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
			var end = arguments[1];

			var that = this;
			if (!that.options.limit) {
				that.options.limit = [];
			}
			that.options.limit[0] = start;
			if (!tools.empty(end)) {
				that.options.limit[1] = end;
			}
			return this;
		}
		/**
   * 排序
   * @作者     como
   * @时间     2018-05-24
   * @版权     思智捷信息管理系统
   * @版本     1.0.0
   * @param  {String}   mixedparam [description]
   * @return {[type]}              [description]
   */

	}, {
		key: 'order',
		value: function order() {
			var mixedparam = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

			var that = this;
			if (!tools.empty(mixedparam)) {
				if (!that.options.order) {
					that.options.order = [];
				}
				that.options.order.push(mixedparam);
			}
			return this;
		}
		/**
   * 分组
   * @作者     como
   * @时间     2018-05-24
   * @版权     思智捷信息管理系统
   * @版本     1.0.0
   * @param  {String}   mixedparam [description]
   * @return {[type]}              [description]
   */

	}, {
		key: 'group',
		value: function group() {
			var mixedparam = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

			var that = this;
			if (!tools.empty(mixedparam)) {
				if (!that.options.group) {
					that.options.group = [];
				}
				that.options.group.push(mixedparam);
			}
			return this;
		}
		/**
   * 聚合条件
   * @作者     como
   * @时间     2018-05-24
   * @版权     思智捷信息管理系统
   * @版本     1.0.0
   * @param  {String}   mixedparam [description]
   * @return {[type]}              [description]
   */

	}, {
		key: 'having',
		value: function having() {
			var mixedparam = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

			var that = this;
			if (!tools.empty(mixedparam)) {
				if (!that.options.having) {
					that.options.having = [];
				}
				that.options.having.push(mixedparam);
			}
			return this;
		}
		/**
   * 页数限制
   * @作者     como
   * @时间     2018-05-24
   * @版权     思智捷信息管理系统
   * @版本     1.0.0
   * @param  {Number}   p     [description]
   * @param  {[type]}   limit [description]
   * @return {[type]}         [description]
   */

	}, {
		key: 'page',
		value: function page() {
			var p = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
			var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30;

			var that = this;
			if (!that.options.limit) {
				that.options.limit = [];
			}
			if (tools.is_string(p)) {
				var arr = tools.explode(',', p);
				that.options.limit[0] = (0, 0, (parseInt(arr[0]) - 1) * parseInt(arr[1]));
				that.options.limit[1] = (1, 0, parseInt(arr[1]));
			} else {
				if (!tools.empty(limit)) {
					that.options.limit[0] = (0, 0, (p - 1) * limit);
					that.options.limit[1] = (1, 0, limit);
				}
			}
			return this;
		}
		/**
   * join链接
   * @作者     como
   * @时间     2018-05-24
   * @版权     思智捷信息管理系统
   * @版本     1.0.0
   * @param  {String}   mixedparam [description]
   * @return {[type]}              [description]
   */

	}, {
		key: 'join',
		value: function join() {
			var mixedparam = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
			var type = arguments[1];

			var that = this;
			if (!tools.empty(mixedparam)) {
				if (!that.options.join) {
					that.options.join = [];
				}
				if (tools.is_string(mixedparam)) {
					if (type) {
						that.options.join.push({ type: type, expression: mixedparam });
					} else {
						that.options.join.push({ expression: mixedparam, type: null });
					}
				} else if (tools.is_array(mixedparam)) {
					mixedparam.forEach(function (item) {
						that.options.join.push({ expression: item, type: null });
					});
				}
			}
			return this;
		}
		/**
   * union查询
   * @作者     como
   * @时间     2018-05-24
   * @版权     思智捷信息管理系统
   * @版本     1.0.0
   * @param  {String}   mixedparam [description]
   * @param  {[type]}   type       [description]
   * @return {[type]}              [description]
   */

	}, {
		key: 'union',
		value: function union() {
			var mixedparam = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
			var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

			var that = this;
			if (!tools.empty(mixedparam)) {
				if (!that.options.union) {
					that.options.union = [];
				}
				if (tools.is_string(mixedparam)) {
					that.options.union.push({ expression: mixedparam, type: type });
				} else if (tools.is_array(mixedparam)) {
					mixedparam.forEach(function (item) {
						that.options.union.push({ expression: item, type: type });
					});
				} else if (tools.is_object(mixedparam)) {
					that.options.union.push({ expression: mixedparam, type: type });
				}
			}
			return this;
		}
		/**
   * 数据表
   * @作者     como
   * @时间     2018-05-24
   * @版权     思智捷信息管理系统
   * @版本     1.0.0
   * @param  {String}   tableName [description]
   * @return {[type]}             [description]
   */

	}, {
		key: 'table',
		value: function table() {
			var tableName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

			var that = this;
			if (!tools.empty(tableName)) {
				that.options.table = tableName;
			}
			return this;
		}
		/**
   * 别名检测
   * @作者     como
   * @时间     2018-05-24
   * @版权     思智捷信息管理系统
   * @版本     1.0.0
   * @param  {String}   aliasName [description]
   * @return {[type]}             [description]
   */

	}, {
		key: 'alias',
		value: function alias() {
			var aliasName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

			var that = this;
			if (!tools.empty(aliasName)) {
				that.options.alias = aliasName;
			}
			return this;
		}
		/**
   * 字段去重查询
   * @作者     como
   * @时间     2018-05-24
   * @版权     思智捷信息管理系统
   * @版本     1.0.0
   * @param  {Boolean}  boolean [description]
   * @return {[type]}           [description]
   */

	}, {
		key: 'distinct',
		value: function distinct() {
			var boolean = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

			var that = this;
			if (boolean === true) {
				that.options.distinct = true;
			}
			return this;
		}
		/**
   * 数据写入
   * @作者     como
   * @时间     2018-05-24
   * @版权     思智捷信息管理系统
   * @版本     1.0.0
   * @param  {Object}   objdata [description]
   * @return {[type]}           [description]
   */

	}, {
		key: 'data',
		value: function data() {
			var objdata = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			var that = this;
			if (tools.is_array(objdata)) {
				if (!that.options.data) {
					that.options.data = [];
				}
				that.options.data = objdata;
			} else if (tools.is_object(objdata)) {
				if (!that.options.data) {
					that.options.data = {};
				}
				that.options.data = (0, _assign2.default)(that.options.data, objdata);
			}
			return this;
		}
	}]);
	return Driver;
}();

module.exports = Driver;
