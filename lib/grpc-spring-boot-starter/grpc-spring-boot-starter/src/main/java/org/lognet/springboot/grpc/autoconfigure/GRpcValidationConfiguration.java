package org.lognet.springboot.grpc.autoconfigure;

import org.lognet.springboot.grpc.GRpcGlobalInterceptor;
import org.lognet.springboot.grpc.validation.ValidatingInterceptor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;

import javax.validation.Validator;

@Configuration
@ConditionalOnClass(Validator.class)
public class GRpcValidationConfiguration {
    @Bean
    @ConditionalOnBean(Validator.class)
    @GRpcGlobalInterceptor
    public ValidatingInterceptor validatingInterceptor(@Lazy Validator validator){
        return  new ValidatingInterceptor(validator);
    }
}
