'use strict';
"use static";

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mysqldb = require('./mysqldb');
var Driver = require('./Driver.class');
var tools = require('usetools');

/**
 * mysql驱动查询类
 */

var MysqlDriver = function (_Driver) {
	(0, _inherits3.default)(MysqlDriver, _Driver);

	/**
  * 构造函数
  * @作者     como
  * @时间     2018-05-24
  * @版权     THINKNODE WEB FRAMEWORK
  * @版本     1.0.5
  * @param  {Object}   config [description]
  * @return {[type]}          [description]
  */
	function MysqlDriver() {
		var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		(0, _classCallCheck3.default)(this, MysqlDriver);

		var _this = (0, _possibleConstructorReturn3.default)(this, (MysqlDriver.__proto__ || (0, _getPrototypeOf2.default)(MysqlDriver)).call(this));

		var that = _this;
		that.config = (0, _assign2.default)({
			host: 'localhost',
			user: '',
			password: '',
			database: '',
			prefix: '',
			multipleStatements: true,
			connectionLimit: 10,
			waitForConnections: false
		}, config);
		/**
   * 表达式查询
   * @type {Object}
   */
		that.expression = {
			EQ: '=', NEQ: '<>', GT: '>', EGT: '>=', LT: '<', ELT: '<=', LIKE: 'LIKE', IN: 'IN', NOTIN: 'NOT IN',
			BETWEEN: 'BETWEEN', NOTBETWEEN: 'NOT BETWEEN'
		};
		/**
   * 最后一次执行查询的语句
   * @type {String}
   */
		that._LAST_SQL = '';
		/**
   * 记录本次查询的所用的信息
   * @type {Object}
   */
		that.log = {};
		/**
   * 如果用户开启的务,则产生事务句柄
   * @type {[type]}
   */
		that.startTransConn = null;
		return _this;
	}
	/**
  * 查询一条数据
  * @作者     como
  * @时间     2018-05-25
  * @版权     THINKNODE WEB FRAMEWORK
  * @版本     1.0.5
  * @param  {Object}   options [description]
  * @return {[type]}           [description]
  */


	(0, _createClass3.default)(MysqlDriver, [{
		key: 'find',
		value: function () {
			var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
				var boolean = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
				var that, result;
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								that = this;

								if (!that.options.field) {
									that.options.field = '*';
								}
								that.options.limit = [1];
								_context.prev = 3;
								_context.next = 6;
								return that.select(boolean);

							case 6:
								result = _context.sent;

								if (!boolean) {
									_context.next = 11;
									break;
								}

								return _context.abrupt('return', result[0]);

							case 11:
								return _context.abrupt('return', result);

							case 12:
								_context.next = 17;
								break;

							case 14:
								_context.prev = 14;
								_context.t0 = _context['catch'](3);
								throw _context.t0;

							case 17:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this, [[3, 14]]);
			}));

			function find() {
				return _ref.apply(this, arguments);
			}

			return find;
		}()
		/**
   * 查询多条数据
   * @作者     como
   * @时间     2018-05-25
   * @版权     THINKNODE WEB FRAMEWORK
   * @版本     1.0.5
   * @param  {Object}   options [description]
   * @return {[type]}           [description]
   */

	}, {
		key: 'select',
		value: function () {
			var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
				var boolean = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
				var that, sql, result;
				return _regenerator2.default.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								that = this;

								if (!that.options.field) {
									that.options.field = '*';
								}
								sql = that._parse_sql(that.options, 'SELECT');

								if (!boolean) {
									_context2.next = 16;
									break;
								}

								_context2.prev = 4;
								_context2.next = 7;
								return that.query(sql, []);

							case 7:
								result = _context2.sent;
								return _context2.abrupt('return', result);

							case 11:
								_context2.prev = 11;
								_context2.t0 = _context2['catch'](4);
								throw _context2.t0;

							case 14:
								_context2.next = 17;
								break;

							case 16:
								return _context2.abrupt('return', '(' + sql + ')');

							case 17:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this, [[4, 11]]);
			}));

			function select() {
				return _ref2.apply(this, arguments);
			}

			return select;
		}()
		/**
   * 调用查询方法
   * @作者     como
   * @时间     2018-05-26
   * @版权     THINKNODE WEB FRAMEWORK
   * @版本     1.0.5
   * @param  {[type]}   sql   [description]
   * @param  {Array}    param [description]
   * @return {[type]}         [description]
   */

	}, {
		key: 'query',
		value: function () {
			var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(sql) {
				var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
				var that, starttime, result, endtime;
				return _regenerator2.default.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								that = this;

								if (that.startTransConn) {
									_context3.next = 4;
									break;
								}

								_context3.next = 4;
								return that._getMysqlInstance();

							case 4:
								that._LAST_SQL = sql;
								_context3.prev = 5;
								starttime = tools.time(true);
								result = null;

								if (!that.startTransConn) {
									_context3.next = 14;
									break;
								}

								_context3.next = 11;
								return that.startTransConn.query(sql, param);

							case 11:
								result = _context3.sent;
								_context3.next = 17;
								break;

							case 14:
								_context3.next = 16;
								return that.conn.query(sql, param);

							case 16:
								result = _context3.sent;

							case 17:
								endtime = tools.time(true);

								that.log.query_sql_time = endtime - starttime;
								return _context3.abrupt('return', result);

							case 22:
								_context3.prev = 22;
								_context3.t0 = _context3['catch'](5);
								throw _context3.t0;

							case 25:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, this, [[5, 22]]);
			}));

			function query(_x4) {
				return _ref3.apply(this, arguments);
			}

			return query;
		}()

		/**
   * 开启事物
   * @作者     como
   * @时间     2018-05-26
   * @版权     THINKNODE WEB FRAMEWORK
   * @版本     1.0.5
   * @return {[type]}   [description]
   */

	}, {
		key: 'startTrans',
		value: function () {
			var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
				var that;
				return _regenerator2.default.wrap(function _callee4$(_context4) {
					while (1) {
						switch (_context4.prev = _context4.next) {
							case 0:
								that = this;
								_context4.prev = 1;
								_context4.next = 4;
								return mysqldb.getInstance(that.config).getPoolHandle();

							case 4:
								that.startTransConn = _context4.sent;
								_context4.next = 7;
								return that.startTransConn.startTrans();

							case 7:
								return _context4.abrupt('return', _context4.sent);

							case 10:
								_context4.prev = 10;
								_context4.t0 = _context4['catch'](1);
								throw _context4.t0;

							case 13:
							case 'end':
								return _context4.stop();
						}
					}
				}, _callee4, this, [[1, 10]]);
			}));

			function startTrans() {
				return _ref4.apply(this, arguments);
			}

			return startTrans;
		}()
		/**
   * 提交事物
   * @作者     como
   * @时间     2018-05-26
   * @版权     THINKNODE WEB FRAMEWORK
   * @版本     1.0.5
   * @return {[type]}   [description]
   */

	}, {
		key: 'commit',
		value: function () {
			var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
				var that, result;
				return _regenerator2.default.wrap(function _callee5$(_context5) {
					while (1) {
						switch (_context5.prev = _context5.next) {
							case 0:
								that = this;
								_context5.prev = 1;
								_context5.next = 4;
								return that.startTransConn.commit();

							case 4:
								result = _context5.sent;

								that.startTransConn = null;
								return _context5.abrupt('return', result);

							case 9:
								_context5.prev = 9;
								_context5.t0 = _context5['catch'](1);
								throw _context5.t0;

							case 12:
							case 'end':
								return _context5.stop();
						}
					}
				}, _callee5, this, [[1, 9]]);
			}));

			function commit() {
				return _ref5.apply(this, arguments);
			}

			return commit;
		}()
		/**
   * 回滚事物
   * @作者     como
   * @时间     2018-05-26
   * @版权     THINKNODE WEB FRAMEWORK
   * @版本     1.0.5
   * @return {[type]}   [description]
   */

	}, {
		key: 'rollback',
		value: function () {
			var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
				var that, result;
				return _regenerator2.default.wrap(function _callee6$(_context6) {
					while (1) {
						switch (_context6.prev = _context6.next) {
							case 0:
								that = this;
								_context6.prev = 1;
								_context6.next = 4;
								return that.startTransConn.rollback();

							case 4:
								result = _context6.sent;

								that.startTransConn = null;
								return _context6.abrupt('return', result);

							case 9:
								_context6.prev = 9;
								_context6.t0 = _context6['catch'](1);
								throw _context6.t0;

							case 12:
							case 'end':
								return _context6.stop();
						}
					}
				}, _callee6, this, [[1, 9]]);
			}));

			function rollback() {
				return _ref6.apply(this, arguments);
			}

			return rollback;
		}()

		/**
   * 新增数据
   * @作者    como
   * @时间    2018-05-25
   * @版权    THINKNODE WEB FRAMEWORK
   * @版本    1.0.0
   * @param {Object}   options [description]
   */

	}, {
		key: 'add',
		value: function () {
			var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
				var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
				var returnResult = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'insertId';
				var that, sql, result;
				return _regenerator2.default.wrap(function _callee7$(_context7) {
					while (1) {
						switch (_context7.prev = _context7.next) {
							case 0:
								that = this;

								if (!tools.empty(data)) {
									that.data(data);
								}
								sql = that._parse_sql(that.options, 'INSERT');
								_context7.prev = 3;
								_context7.next = 6;
								return that.query(sql);

							case 6:
								result = _context7.sent;

								if (!(returnResult === true)) {
									_context7.next = 11;
									break;
								}

								return _context7.abrupt('return', result);

							case 11:
								return _context7.abrupt('return', result[returnResult]);

							case 12:
								_context7.next = 17;
								break;

							case 14:
								_context7.prev = 14;
								_context7.t0 = _context7['catch'](3);
								throw _context7.t0;

							case 17:
							case 'end':
								return _context7.stop();
						}
					}
				}, _callee7, this, [[3, 14]]);
			}));

			function add() {
				return _ref7.apply(this, arguments);
			}

			return add;
		}()
		/**
   * 批量插入数据
   * @作者    como
   * @时间    2018-05-25
   * @版权    THINKNODE WEB FRAMEWORK
   * @版本    1.0.0
   * @param {Object}   options [description]
   */

	}, {
		key: 'addAll',
		value: function () {
			var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
				var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
				var returnResult = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'insertId';
				var that, sql, result;
				return _regenerator2.default.wrap(function _callee8$(_context8) {
					while (1) {
						switch (_context8.prev = _context8.next) {
							case 0:
								that = this;

								if (!tools.empty(data)) {
									that.data(data);
								}
								sql = that._parse_sql(that.options, 'INSERTAll');
								_context8.prev = 3;
								_context8.next = 6;
								return that.query(sql);

							case 6:
								result = _context8.sent;

								if (!(returnResult === true)) {
									_context8.next = 11;
									break;
								}

								return _context8.abrupt('return', result);

							case 11:
								return _context8.abrupt('return', result[returnResult]);

							case 12:
								_context8.next = 17;
								break;

							case 14:
								_context8.prev = 14;
								_context8.t0 = _context8['catch'](3);
								throw _context8.t0;

							case 17:
							case 'end':
								return _context8.stop();
						}
					}
				}, _callee8, this, [[3, 14]]);
			}));

			function addAll() {
				return _ref8.apply(this, arguments);
			}

			return addAll;
		}()
		/**
   * 批量执行sql语句
   * @作者     como
   * @时间     2018-05-25
   * @版权     THINKNODE WEB FRAMEWORK
   * @版本     1.0.5
   * @param  {Object}   options [description]
   * @return {[type]}           [description]
   */

	}, {
		key: 'selectAll',
		value: function () {
			var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9() {
				var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
				var that, result;
				return _regenerator2.default.wrap(function _callee9$(_context9) {
					while (1) {
						switch (_context9.prev = _context9.next) {
							case 0:
								that = this;

								if (tools.empty(arr)) {
									_context9.next = 14;
									break;
								}

								_context9.prev = 2;
								_context9.next = 5;
								return that.query(tools.implode(';', arr));

							case 5:
								result = _context9.sent;
								return _context9.abrupt('return', result);

							case 9:
								_context9.prev = 9;
								_context9.t0 = _context9['catch'](2);
								throw _context9.t0;

							case 12:
								_context9.next = 15;
								break;

							case 14:
								return _context9.abrupt('return', false);

							case 15:
							case 'end':
								return _context9.stop();
						}
					}
				}, _callee9, this, [[2, 9]]);
			}));

			function selectAll() {
				return _ref9.apply(this, arguments);
			}

			return selectAll;
		}()
		/**
   * 更新数据
   * @作者     como
   * @时间     2018-05-25
   * @版权     THINKNODE WEB FRAMEWORK
   * @版本     1.0.5
   * @param  {Object}   options [description]
   * @return {[type]}           [description]
   */

	}, {
		key: 'update',
		value: function () {
			var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10() {
				var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
				var returnResult = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'affectedRows';
				var that, sql, result;
				return _regenerator2.default.wrap(function _callee10$(_context10) {
					while (1) {
						switch (_context10.prev = _context10.next) {
							case 0:
								that = this;

								if (!tools.empty(data)) {
									that.data(data);
								}
								sql = that._parse_sql(that.options, 'UPDATE');
								_context10.prev = 3;
								_context10.next = 6;
								return that.query(sql);

							case 6:
								result = _context10.sent;

								if (!(returnResult === true)) {
									_context10.next = 11;
									break;
								}

								return _context10.abrupt('return', result);

							case 11:
								return _context10.abrupt('return', result[returnResult]);

							case 12:
								_context10.next = 17;
								break;

							case 14:
								_context10.prev = 14;
								_context10.t0 = _context10['catch'](3);
								throw _context10.t0;

							case 17:
							case 'end':
								return _context10.stop();
						}
					}
				}, _callee10, this, [[3, 14]]);
			}));

			function update() {
				return _ref10.apply(this, arguments);
			}

			return update;
		}()
		/**
   * 删除数据
   * @作者     como
   * @时间     2018-05-25
   * @版权     THINKNODE WEB FRAMEWORK
   * @版本     1.0.5
   * @param  {Object}   options [description]
   * @return {[type]}           [description]
   */

	}, {
		key: 'delete',
		value: function () {
			var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11() {
				var that, sql, result;
				return _regenerator2.default.wrap(function _callee11$(_context11) {
					while (1) {
						switch (_context11.prev = _context11.next) {
							case 0:
								that = this;
								sql = that._parse_sql(that.options, 'DELETE');

								if (!(sql === false)) {
									_context11.next = 6;
									break;
								}

								throw new Error('unfilled deleting conditions');

							case 6:
								_context11.prev = 6;
								_context11.next = 9;
								return that.query(sql);

							case 9:
								result = _context11.sent;
								return _context11.abrupt('return', result['affectedRows']);

							case 13:
								_context11.prev = 13;
								_context11.t0 = _context11['catch'](6);
								throw _context11.t0;

							case 16:
							case 'end':
								return _context11.stop();
						}
					}
				}, _callee11, this, [[6, 13]]);
			}));

			function _delete() {
				return _ref11.apply(this, arguments);
			}

			return _delete;
		}()
		/**
   * 统计查询
   * @作者     como
   * @时间     2018-05-25
   * @版权     THINKNODE WEB FRAMEWORK
   * @版本     1.0.5
   * @param  {Object}   options [description]
   * @return {[type]}           [description]
   */

	}, {
		key: 'count',
		value: function () {
			var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12() {
				var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';
				var that;
				return _regenerator2.default.wrap(function _callee12$(_context12) {
					while (1) {
						switch (_context12.prev = _context12.next) {
							case 0:
								that = this;
								_context12.prev = 1;
								_context12.next = 4;
								return that.call_mysql_function('count', field);

							case 4:
								return _context12.abrupt('return', _context12.sent);

							case 7:
								_context12.prev = 7;
								_context12.t0 = _context12['catch'](1);
								throw _context12.t0;

							case 10:
							case 'end':
								return _context12.stop();
						}
					}
				}, _callee12, this, [[1, 7]]);
			}));

			function count() {
				return _ref12.apply(this, arguments);
			}

			return count;
		}()
		/**
   * 求和查询
   * @作者     como
   * @时间     2018-05-25
   * @版权     THINKNODE WEB FRAMEWORK
   * @版本     1.0.5
   * @param  {Object}   options [description]
   * @return {[type]}           [description]
   */

	}, {
		key: 'sum',
		value: function () {
			var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13() {
				var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
				var that;
				return _regenerator2.default.wrap(function _callee13$(_context13) {
					while (1) {
						switch (_context13.prev = _context13.next) {
							case 0:
								that = this;
								_context13.prev = 1;
								_context13.next = 4;
								return that.call_mysql_function('sum', field);

							case 4:
								return _context13.abrupt('return', _context13.sent);

							case 7:
								_context13.prev = 7;
								_context13.t0 = _context13['catch'](1);
								throw _context13.t0;

							case 10:
							case 'end':
								return _context13.stop();
						}
					}
				}, _callee13, this, [[1, 7]]);
			}));

			function sum() {
				return _ref13.apply(this, arguments);
			}

			return sum;
		}()
		/**
   * 最大值查询
   * @作者     como
   * @时间     2018-05-26
   * @版权     THINKNODE WEB FRAMEWORK
   * @版本     1.0.5
   * @param  {String}   field [description]
   * @return {[type]}         [description]
   */

	}, {
		key: 'max',
		value: function () {
			var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14() {
				var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
				var that;
				return _regenerator2.default.wrap(function _callee14$(_context14) {
					while (1) {
						switch (_context14.prev = _context14.next) {
							case 0:
								that = this;
								_context14.prev = 1;
								_context14.next = 4;
								return that.call_mysql_function('max', field);

							case 4:
								return _context14.abrupt('return', _context14.sent);

							case 7:
								_context14.prev = 7;
								_context14.t0 = _context14['catch'](1);
								throw _context14.t0;

							case 10:
							case 'end':
								return _context14.stop();
						}
					}
				}, _callee14, this, [[1, 7]]);
			}));

			function max() {
				return _ref14.apply(this, arguments);
			}

			return max;
		}()
		/**
   * 字段求平均值
   * @作者     como
   * @时间     2018-05-26
   * @版权     THINKNODE WEB FRAMEWORK
   * @版本     1.0.5
   * @param  {String}   field [description]
   * @return {[type]}         [description]
   */

	}, {
		key: 'avg',
		value: function () {
			var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15() {
				var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
				var that;
				return _regenerator2.default.wrap(function _callee15$(_context15) {
					while (1) {
						switch (_context15.prev = _context15.next) {
							case 0:
								that = this;
								_context15.prev = 1;
								_context15.next = 4;
								return that.call_mysql_function('avg', field);

							case 4:
								return _context15.abrupt('return', _context15.sent);

							case 7:
								_context15.prev = 7;
								_context15.t0 = _context15['catch'](1);
								throw _context15.t0;

							case 10:
							case 'end':
								return _context15.stop();
						}
					}
				}, _callee15, this, [[1, 7]]);
			}));

			function avg() {
				return _ref15.apply(this, arguments);
			}

			return avg;
		}()
		/**
   * 求最小值
   * @作者     como
   * @时间     2018-05-26
   * @版权     THINKNODE WEB FRAMEWORK
   * @版本     1.0.5
   * @param  {String}   field [description]
   * @return {[type]}         [description]
   */

	}, {
		key: 'min',
		value: function () {
			var _ref16 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16() {
				var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
				var that;
				return _regenerator2.default.wrap(function _callee16$(_context16) {
					while (1) {
						switch (_context16.prev = _context16.next) {
							case 0:
								that = this;
								_context16.prev = 1;
								_context16.next = 4;
								return that.call_mysql_function('min', field);

							case 4:
								return _context16.abrupt('return', _context16.sent);

							case 7:
								_context16.prev = 7;
								_context16.t0 = _context16['catch'](1);
								throw _context16.t0;

							case 10:
							case 'end':
								return _context16.stop();
						}
					}
				}, _callee16, this, [[1, 7]]);
			}));

			function min() {
				return _ref16.apply(this, arguments);
			}

			return min;
		}()
		/**
   * 调用mysql函数
   * @作者     como
   * @时间     2018-05-26
   * @版权     THINKNODE WEB FRAMEWORK
   * @版本     1.0.5
   * @param  {String}   funcName [description]
   * @param  {String}   field    [description]
   * @return {[type]}            [description]
   */

	}, {
		key: 'call_mysql_function',
		value: function () {
			var _ref17 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee17() {
				var funcName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
				var field = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
				var that, result;
				return _regenerator2.default.wrap(function _callee17$(_context17) {
					while (1) {
						switch (_context17.prev = _context17.next) {
							case 0:
								that = this;

								if (!tools.empty(field)) {
									_context17.next = 5;
									break;
								}

								return _context17.abrupt('return', false);

							case 5:
								_context17.prev = 5;

								that.field(funcName.toUpperCase() + '(' + field + ') as ' + funcName);
								_context17.next = 9;
								return that.find();

							case 9:
								result = _context17.sent;
								return _context17.abrupt('return', result[funcName]);

							case 13:
								_context17.prev = 13;
								_context17.t0 = _context17['catch'](5);
								throw _context17.t0;

							case 16:
							case 'end':
								return _context17.stop();
						}
					}
				}, _callee17, this, [[5, 13]]);
			}));

			function call_mysql_function() {
				return _ref17.apply(this, arguments);
			}

			return call_mysql_function;
		}()
		/**
   * data 分析
   * @作者     como
   * @时间     2018-05-26
   * @版权     THINKNODE WEB FRAMEWORK
   * @版本     1.0.5
   * @param  {Array}    arr [description]
   * @return {[type]}       [description]
   */

	}, {
		key: '_parse_data',
		value: function _parse_data() {
			var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var isupdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			var that = this;
			var result = { keys: [], values: [] };
			var updateresult = [];
			for (var obj in data) {
				var tempvalue = data[obj];
				if (tools.is_string(tempvalue)) {
					tempvalue = '"' + data[obj].replace(/'/g, '\'').replace(/"/g, '\"') + '"';
				}
				if (isupdate) {
					updateresult.push('`' + obj + '` = ' + tempvalue);
				} else {
					result.keys.push('`' + obj + '`');
					result.values.push(tempvalue);
				}
			}
			return isupdate ? updateresult : result;
		}
		/**
   * 批量插入数据分析
   * @作者     como
   * @时间     2018-05-26
   * @版权     THINKNODE WEB FRAMEWORK
   * @版本     1.0.5
   * @param  {Array}    arr [description]
   * @return {[type]}       [description]
   */

	}, {
		key: '_parse_data_all',
		value: function _parse_data_all() {
			var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

			var that = this;
			var result = { keys: [], values: [] };
			if (!tools.empty(arr[0]) && tools.is_object(arr[0])) {
				result.keys = (0, _keys2.default)(arr[0]);
				arr.forEach(function (item, index) {
					if (tools.is_object(item)) {
						var temparr = [];
						for (var obj in item) {
							var tempvalue = item[obj];
							if (tools.is_string(tempvalue)) {
								tempvalue = '"' + item[obj].replace(/'/g, '\'').replace(/"/g, '\"') + '"';
							}
							temparr.push(tempvalue);
						}
						if (!tools.empty(temparr)) {
							result.values.push('(' + tools.implode(',', temparr) + ')');
						}
					}
				});
			}
			return result;
		}

		/**
   * 解析成sql语句
   * @作者     como
   * @时间     2018-05-25
   * @版权     THINKNODE WEB FRAMEWORK
   * @版本     1.0.5
   * @param  {Object}   options [description]
   * @return {[type]}           [description]
   */

	}, {
		key: '_parse_sql',
		value: function _parse_sql() {
			var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'SELECT ';

			var that = this;
			var sql = '';
			var starttime = tools.time(true);
			switch (type) {
				case 'SELECT':
					sql = that._parse_sql_select(options);
					break;
				case 'INSERT':
					sql = that._parse_sql_insert(options);
					break;
				case 'INSERTAll':
					sql = that._parse_sql_insert(options, true);
					break;
				case 'DELETE':
					sql = that._parse_sql_delete(options);
					break;
				case 'UPDATE':
					sql = that._parse_sql_update(options);
					break;
			}
			var endtime = tools.time(true);
			that.log.parse_sql_time = endtime - starttime;
			that.options = {};
			return sql;
		}
		/**
   * 查询分析器
   * @作者     como
   * @时间     2018-05-25
   * @版权     THINKNODE WEB FRAMEWORK
   * @版本     1.0.5
   * @param  {Object}   options [description]
   * @return {[type]}           [description]
   */

	}, {
		key: '_parse_sql_select',
		value: function _parse_sql_select() {
			var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			var that = this;
			var index = ['distinct', 'field', 'table', 'join', 'union', 'where', 'group', 'having', 'order', 'limit'];
			var result = [];
			index.forEach(function (item) {
				if (options[item]) {
					switch (item) {
						case 'distinct':
							result.push(item);
							break;
						case 'field':
							result.push(that._parse_field(options[item]));
							break;
						case 'table':
							result.push('FROM ' + that._parse_table(options[item]));
							break;
						case 'join':
							result.push('JOIN ' + that._parse_join(options[item]));
							break;
						case 'union':
							result.push(that._parse_union(options[item]));
							break;
						case 'where':
							result.push('WHERE ' + that._parse_where(options[item]));
							break;
						case 'group':
							result.push('GROUP BY ' + that._parse_group(options[item]));
							break;
						case 'having':
							result.push('HAVING ' + that._parse_having(options[item]));
							break;
						case 'order':
							result.push('ORDER BY ' + that._parse_order(options[item]));
							break;
						case 'limit':
							result.push('LIMIT ' + that._parse_limit(options[item]));
							break;
					}
				}
			});
			return 'SELECT ' + tools.implode(' ', result);
		}

		/**
   * 分析插入语句
   * @作者     como
   * @时间     2018-05-26
   * @版权     THINKNODE WEB FRAMEWORK
   * @版本     1.0.5
   * @param  {Object}   options [description]
   * @return {[type]}           [description]
   */

	}, {
		key: '_parse_sql_insert',
		value: function _parse_sql_insert() {
			var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var all = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			var that = this;
			var expression = ['table', 'data'];
			var result = ['INSERT INTO'];
			expression.forEach(function (item) {
				if (options[item]) {
					switch (item) {
						case 'table':
							result.push(that._parse_table(options[item]));
							break;
						case 'data':
							if (!all) {
								var data = that._parse_data(options[item]);
								if (!tools.empty(data.keys) && !tools.empty(data.values)) {
									result.push('( ' + tools.implode(',', data.keys) + ' ) VALUES (' + tools.implode(',', data.values) + ')');
								}
							} else {
								var _data = that._parse_data_all(options[item]);
								if (!tools.empty(_data.keys) && !tools.empty(_data.values)) {
									result.push('( ' + tools.implode(',', _data.keys) + ' ) VALUES ' + tools.implode(',', _data.values));
								}
							}
							break;
					}
				}
			});
			return tools.implode(' ', result);
		}
		/**
   * delete 分析
   * @作者     como
   * @时间     2018-05-28
   * @版权     THINKNODE WEB FRAMEWORK
   * @版本     1.0.5
   * @param  {Object}   options [description]
   * @return {[type]}           [description]
   */

	}, {
		key: '_parse_sql_delete',
		value: function _parse_sql_delete() {
			var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			var that = this;
			var expression = ['table', 'where'];
			var result = ['DELETE FROM'];
			if (tools.empty(options.where) || tools.empty(options.table)) {
				return false;
			} else {
				expression.forEach(function (item) {
					if (options[item]) {
						switch (item) {
							case 'table':
								result.push(that._parse_table(options[item]));
								break;
							case 'where':
								if (!tools.empty(options[item])) {
									result.push('WHERE ' + that._parse_where(options[item]));
								}
								break;
						}
					}
				});
				return tools.implode(' ', result);
			}
		}
		/**
   * update 分析
   * @作者     como
   * @时间     2018-05-28
   * @版权     THINKNODE WEB FRAMEWORK
   * @版本     1.0.5
   * @param  {Object}   options [description]
   * @return {[type]}           [description]
   */

	}, {
		key: '_parse_sql_update',
		value: function _parse_sql_update() {
			var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			var that = this;
			var expression = ['table', 'data', 'where'];
			var result = ['UPDATE'];
			console.log(options);
			expression.forEach(function (item) {
				if (options[item]) {
					switch (item) {
						case 'table':
							result.push(that._parse_table(options[item]));
							break;
						case 'data':
							var data = that._parse_data(options[item], true);
							result.push('SET ' + tools.implode(',', data));
							break;
						case 'where':
							result.push('WHERE ' + that._parse_where(options[item]));
							break;
					}
				}
			});
			return tools.implode(' ', result);
		}

		/**
   * 排序分析
   * @作者     como
   * @时间     2018-05-25
   * @版权     THINKNODE WEB FRAMEWORK
   * @版本     1.0.5
   * @param  {Array}    arr [description]
   * @return {[type]}       [description]
   */

	}, {
		key: '_parse_order',
		value: function _parse_order() {
			var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

			var that = this;
			var result = [];
			arr.forEach(function (item) {
				if (tools.is_string(item)) {
					result.push(item);
				} else if (tools.is_object(item)) {
					var keys = (0, _keys2.default)(item);
					var values = (0, _values2.default)(item);
					keys.forEach(function (childitem, index) {
						result.push('`' + childitem + '` ' + values[index]);
					});
				}
			});
			return tools.implode(',', result);
		}
		/**
   * join分析
   * @作者     como
   * @时间     2018-05-26
   * @版权     THINKNODE WEB FRAMEWORK
   * @版本     1.0.5
   * @param  {Array}    arr [description]
   * @return {[type]}       [description]
   */

	}, {
		key: '_parse_join',
		value: function _parse_join() {
			var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

			var that = this;
			var result = [];
			arr.forEach(function (item) {
				if (!tools.empty(item.type)) {
					result.push(item.type + ' ' + that._parse_join_table(item.expression));
				} else {
					result.push(that._parse_join_table(item.expression));
				}
			});
			return tools.implode(' JOIN ', result);
		}
		/**
   * union 分析
   * @作者     como
   * @时间     2018-05-26
   * @版权     THINKNODE WEB FRAMEWORK
   * @版本     1.0.5
   * @param  {Array}    arr [description]
   * @return {[type]}       [description]
   */

	}, {
		key: '_parse_union',
		value: function _parse_union() {
			var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

			var that = this;
			var result = [];
			arr.forEach(function (item) {
				if (tools.is_string(item.expression)) {
					if (item.type) {
						result.push('UNION ALL ' + item.expression);
					} else {
						result.push('UNION ' + item.expression);
					}
				} else if (tools.is_object(item.expression)) {
					if (item.type) {
						result.push('UNION ALL ' + 'SELECT `' + item.expression.field + '` FROM `' + item.expression.table + '`');
					} else {
						result.push('UNION ' + 'SELECT `' + item.expression.field + '` FROM `' + item.expression.table + '`');
					}
				}
			});
			return tools.implode(' ', result);
		}

		/**
   * join 连表时数据表分析
   * @作者     como
   * @时间     2018-05-26
   * @版权     THINKNODE WEB FRAMEWORK
   * @版本     1.0.5
   * @param  {String}   expression [description]
   * @return {[type]}              [description]
   */

	}, {
		key: '_parse_join_table',
		value: function _parse_join_table() {
			var expression = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

			var that = this;
			if (tools.is_string(expression)) {
				var newexpression = expression.replace(/__([A-Z0-9_-]+)__/g, function ($1) {
					return that.config.prefix + $1.replace(/__/g, '').toLowerCase();
				});
				return newexpression;
			} else {
				return expression;
			}
		}
		/**
   * where分析
   * @作者     como
   * @时间     2018-05-25
   * @版权     THINKNODE WEB FRAMEWORK
   * @版本     1.0.5
   * @param  {String}   mixedwhere [description]
   * @return {[type]}              [description]
   */

	}, {
		key: '_parse_where',
		value: function _parse_where() {
			var wherearr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

			var that = this;
			var result = [];
			if (tools.is_array(wherearr)) {
				wherearr.forEach(function (item) {
					if (tools.is_object(item)) {
						var rowstemp = [];
						var templogic = item._logic;
						if (item._logic) {
							delete item._logic;
						}
						for (var obj in item) {
							if (tools.is_array(item[obj])) {
								rowstemp.push('`' + obj + '` ' + that._parse_where_expression(item[obj]));
							} else {
								if (tools.is_string(item[obj])) {
									rowstemp.push('`' + obj + '` = "' + item[obj] + '"');
								} else {
									rowstemp.push('`' + obj + '` = ' + item[obj]);
								}
							}
						}
						if (templogic) {
							result.push(tools.implode(' ' + templogic + ' ', rowstemp));
						} else {
							result.push(tools.implode(' AND ', rowstemp));
						}
					} else if (tools.is_string(item)) {
						result.push(item);
					}
				});
				return tools.implode(' AND ', result);
			}
			return '';
		}
		/**
   * 分析语法表达式
   * @作者     como
   * @时间     2018-05-25
   * @版权     THINKNODE WEB FRAMEWORK
   * @版本     1.0.5
   * @param  {Array}    arr [description]
   * @return {[type]}       [description]
   */

	}, {
		key: '_parse_where_expression',
		value: function _parse_where_expression() {
			var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

			var that = this;
			var result = [];
			result.push(that.expression[arr[0].toUpperCase()]);
			switch (arr[0].toUpperCase()) {
				case "LIKE":
					result.push('("' + arr[1] + '")');
					break;
				case 'IN':
					if (tools.is_array(arr[1])) {
						result.push('(' + tools.impolde(',', arr[1]) + ')');
					} else if (tools.is_string(arr[1])) {
						result.push('(' + arr[1] + ')');
					}
					break;
				case 'NOTIN':
					if (tools.is_array(arr[1])) {
						result.push('(' + tools.impolde(',', arr[1]) + ')');
					} else if (tools.is_string(arr[1])) {
						result.push('(' + arr[1] + ')');
					}
					break;
				case 'BETWEEN':
					if (tools.is_array(arr[1])) {
						result.push(tools.implode(' AND ', arr[1]));
					} else if (tools.is_string(arr[1])) {
						var _arr = tools.explode(',', _arr[1]);
						result.push(tools.implode(' AND ', _arr));
					}
					break;
				case 'NOTBETWEEN':
					if (tools.is_array(arr[1])) {
						result.push(tools.implode(' AND ', arr[1]));
					} else if (tools.is_string(arr[1])) {
						var _arr2 = tools.explode(',', _arr2[1]);
						result.push(tools.implode(' AND ', _arr2));
					}
					break;
				default:
					if (tools.is_string(arr[1])) {
						result.push('"' + arr[1] + '"');
					} else {
						result.push(arr[1]);
					}
			}
			return tools.implode(' ', result);
		}

		/**
   * 查询字段
   * @作者     como
   * @时间     2018-05-25
   * @版权     THINKNODE WEB FRAMEWORK
   * @版本     1.0.5
   * @return {[type]}   [description]
   */

	}, {
		key: '_parse_field',
		value: function _parse_field() {
			var mixedfields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

			var that = this;
			var result = [];
			if (tools.is_array(mixedfields)) {
				mixedfields.forEach(function (item) {
					if (tools.is_string(item)) {
						result.push(item);
					} else if (tools.is_object(item)) {
						var keys = (0, _keys2.default)(item);
						var values = (0, _values2.default)(item);
						result.push('`' + keys[0] + '` AS `' + values[0] + '`');
					}
				});
			} else if (tools.is_string(mixedfields)) {
				result.push(mixedfields);
			}
			return tools.implode(',', result);
		}
		/**
   * 解析表名
   * @作者     como
   * @时间     2018-05-25
   * @版权     THINKNODE WEB FRAMEWORK
   * @版本     1.0.5
   * @return {[type]}   [description]
   */

	}, {
		key: '_parse_table',
		value: function _parse_table() {
			var tableinfo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

			var table = '';
			var that = this;
			if (tableinfo) {
				if (tools.is_array(tableinfo)) {
					table = that._parse_table_object(tableinfo);
				} else if (tools.is_string(tableinfo)) {
					table = that._parse_table_string(tableinfo);
				}
			}
			return that._parse_alias(table);
		}
		/**
   * 分析alias字段
   * @作者     como
   * @时间     2018-05-25
   * @版权     THINKNODE WEB FRAMEWORK
   * @版本     1.0.5
   * @param  {String}   table [description]
   * @return {[type]}         [description]
   */

	}, {
		key: '_parse_alias',
		value: function _parse_alias() {
			var table = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

			var that = this;
			var arr = tools.explode(',', table);
			if (arr.length == 1) {
				if (that.options.alias) {
					table += ' as `' + that.options.alias + '`';
				}
			}
			return table;
		}
		/**
   * 表名字符串分析
   * @作者     como
   * @时间     2018-05-25
   * @版权     THINKNODE WEB FRAMEWORK
   * @版本     1.0.5
   * @param  {String}   table [description]
   * @return {[type]}         [description]
   */

	}, {
		key: '_parse_table_string',
		value: function _parse_table_string() {
			var table = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

			var that = this;
			if (table.indexOf('SELECT') > -1) {
				return table;
			}
			var newtable = that._parse_join_table(table);
			var arr = tools.explode(',', newtable);
			var result = [];
			arr.forEach(function (item) {
				var temparr = tools.explode(' ', item);
				if (temparr.length > 1) {
					result.push('`' + temparr[0] + '` `' + temparr[1] + '`');
				} else {
					result.push('`' + temparr[0] + '`');
				}
			});
			return tools.implode(',', result);
		}
		/**
   * 数据表如果是数组对象
   * @作者     como
   * @时间     2018-05-25
   * @版权     THINKNODE WEB FRAMEWORK
   * @版本     1.0.5
   * @param  {Array}    table [description]
   * @return {[type]}         [description]
   */

	}, {
		key: '_parse_table_object',
		value: function _parse_table_object() {
			var table = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

			var that = this;
			var result = [];
			table.forEach(function (item) {
				if (tools.is_object(item)) {
					for (var obj in item) {
						result.push('`' + obj + '`' + ' `' + item[obj] + '`');
					}
				}
			});
			return tools.implode(',', result);
		}
		/**
   * limit 分析
   * @作者     como
   * @时间     2018-05-25
   * @版权     THINKNODE WEB FRAMEWORK
   * @版本     1.0.5
   * @param  {Array}    arr [description]
   * @return {[type]}       [description]
   */

	}, {
		key: '_parse_limit',
		value: function _parse_limit() {
			var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

			var that = this;
			return tools.implode(',', arr);
		}
		/**
   * group 分析
   * @作者     como
   * @时间     2018-05-25
   * @版权     THINKNODE WEB FRAMEWORK
   * @版本     1.0.5
   * @param  {Array}    arr [description]
   * @return {[type]}       [description]
   */

	}, {
		key: '_parse_group',
		value: function _parse_group() {
			var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

			var that = this;
			return tools.implode(',', arr);
		}
		/**
   * having 分析
   * @作者     como
   * @时间     2018-05-25
   * @版权     THINKNODE WEB FRAMEWORK
   * @版本     1.0.5
   * @param  {Array}    arr [description]
   * @return {[type]}       [description]
   */

	}, {
		key: '_parse_having',
		value: function _parse_having() {
			var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

			var that = this;
			var result = [];
			arr.forEach(function (item) {
				if (tools.is_array(item)) {
					result.push(tools.implode(' AND ', item));
				} else {
					result.push(item);
				}
			});
			return tools.implode(' AND ', result);
		}
		/**
   * 获取mysql实例
   * @作者     como
   * @时间     2018-05-26
   * @版权     THINKNODE WEB FRAMEWORK
   * @版本     1.0.5
   * @return {[type]}   [description]
   */

	}, {
		key: '_getMysqlInstance',
		value: function () {
			var _ref18 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee18() {
				var that;
				return _regenerator2.default.wrap(function _callee18$(_context18) {
					while (1) {
						switch (_context18.prev = _context18.next) {
							case 0:
								that = this;
								_context18.next = 3;
								return mysqldb.getInstance(that.config).getPoolHandle();

							case 3:
								that.conn = _context18.sent;

							case 4:
							case 'end':
								return _context18.stop();
						}
					}
				}, _callee18, this);
			}));

			function _getMysqlInstance() {
				return _ref18.apply(this, arguments);
			}

			return _getMysqlInstance;
		}()
		/**
   * 获取最后一条执行的语句
   * @作者     como
   * @时间     2018-05-26
   * @版权     THINKNODE WEB FRAMEWORK
   * @版本     1.0.5
   * @return {[type]}   [description]
   */

	}, {
		key: 'getLastSql',
		value: function getLastSql() {
			return this._LAST_SQL;
		}

		/**
   * [关闭数据库链接]
   * @作者     como
   * @时间     2018-06-22
   * @版权     THINKNODE  WEB           FRAMEWORK
   * @版本     1.0.1
   * @return {[type]}   [description]
   */

	}, {
		key: 'close',
		value: function () {
			var _ref19 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee19() {
				var that;
				return _regenerator2.default.wrap(function _callee19$(_context19) {
					while (1) {
						switch (_context19.prev = _context19.next) {
							case 0:
								that = this;
								_context19.next = 3;
								return mysqldb.getInstance(that.config).close();

							case 3:
								return _context19.abrupt('return', _context19.sent);

							case 4:
							case 'end':
								return _context19.stop();
						}
					}
				}, _callee19, this);
			}));

			function close() {
				return _ref19.apply(this, arguments);
			}

			return close;
		}()
	}]);
	return MysqlDriver;
}(Driver);

module.exports = MysqlDriver;
