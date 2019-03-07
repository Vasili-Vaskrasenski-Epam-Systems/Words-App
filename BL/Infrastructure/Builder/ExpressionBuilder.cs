using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

namespace BL.Infrastructure.Builder
{
    public class ExpressionBuilder
    {
        public static Expression<Func<T, bool>> BuildExpression<T>(params Tuple<string, string, ExpressionMethod>[] propValues)
        {
            ParameterExpression pe = Expression.Parameter(typeof(T), "exp");
            Expression finalExpression = null;
            bool isFirstElement = true;

            foreach (var propertyGroup in propValues)
            {
                var expression = PrepareExpression<T>(pe, propertyGroup);
                if (!isFirstElement)
                {
                    finalExpression = GetExpressionMethod<T>(ExpressionKey.And, finalExpression, expression);
                }
                else
                {
                    finalExpression = expression;
                    isFirstElement = false;
                }
            }

            return Expression.Lambda<Func<T, bool>>(finalExpression, pe);
        }

        private static MethodInfo BuildMethodInfo<T>(String methodName)
        {
            return typeof(T).GetMethod(methodName, new[] { typeof(T) });
        }

        private static Expression GetExpressionMethod<T>(ExpressionMethod comparison, Expression left, Expression right)
        {
            Expression expressionMethod;
            switch (comparison)
            {
                case ExpressionMethod.NotEqual:
                    expressionMethod = Expression.NotEqual(left, right);
                    break;
                case ExpressionMethod.Equal:
                    expressionMethod = Expression.Equal(left, right);
                    break;
                case ExpressionMethod.GreaterOrEqual:
                    if (left.Type == typeof(Guid) && right.Type == typeof(Guid))
                    {
                        left = Expression.Call(left, BuildMethodInfo<Guid>("CompareTo"), right);
                        right = Expression.Constant(0);
                    }

                    expressionMethod = Expression.GreaterThanOrEqual(left, right);
                    break;
                case ExpressionMethod.Greater:
                    if (left.Type == typeof(Guid) && right.Type == typeof(Guid))
                    {
                        left = Expression.Call(left, BuildMethodInfo<Guid>("CompareTo"), right);
                        right = Expression.Constant(0);
                    }

                    expressionMethod = Expression.GreaterThan(left, right);

                    break;
                case ExpressionMethod.Lesser:
                    if (left.Type == typeof(Guid) && right.Type == typeof(Guid))
                    {
                        left = Expression.Call(left, BuildMethodInfo<Guid>("CompareTo"), right);
                        right = Expression.Constant(0);
                    }

                    expressionMethod = Expression.LessThan(left, right);
                    break;
                case ExpressionMethod.LesserOrEqual:
                    if (left.Type == typeof(Guid) && right.Type == typeof(Guid))
                    {
                        left = Expression.Call(left, BuildMethodInfo<Guid>("CompareTo"), right);
                        right = Expression.Constant(0);
                    }

                    expressionMethod = Expression.LessThanOrEqual(left, right);
                    break;
                case ExpressionMethod.Contains:
                    {
                        expressionMethod = Expression.Call(left, BuildMethodInfo<Guid>("Contains"), right);
                        break;
                    }
                default:
                    throw new ArgumentException($"Unhandled comparison type: {comparison}");
            }
            return expressionMethod;
        }

        private static Expression GetExpressionMethod<T>(ExpressionKey key, Expression left, Expression right)
        {
            Expression expression = null;
            switch (key)
            {
                case ExpressionKey.Or:
                    expression = Expression.Or(left, right);
                    break;
                case ExpressionKey.And:
                    expression = Expression.And(left, right);
                    break;
                default:
                    throw new ArgumentException(string.Format("Unhandled expression key: {0}", key));
            }

            return expression;
        }

        private static Expression PrepareExpression<T>(ParameterExpression pe, Tuple<string, string, ExpressionMethod> prop)
        {
            var type = typeof(T);
            var typeProperties = type.GetProperties();

            var requiredProperty = typeProperties.FirstOrDefault(tp => tp.Name.ToLower() == prop.Item1.ToLower());
            if (requiredProperty == null)
            {
                throw new ArgumentException(string.Format("Can not build expression: required property {0} doesn't exist in object {1}", prop.Item1, type.FullName));
            }

            var propertyType = requiredProperty.PropertyType;
            var left = Expression.Property(pe, prop.Item1);
            var right = Expression.Constant(Convert.ChangeType(prop.Item2, propertyType), propertyType);
            Expression expression = null;

            expression = GetExpressionMethod<T>(prop.Item3, left, right);
            return expression;
        }
    }
}
